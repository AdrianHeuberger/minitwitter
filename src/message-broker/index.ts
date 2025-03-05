import { Job, Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { db, postsTable } from '../database';
import { eq } from 'drizzle-orm';
import { textAnalysis } from '../services/ai';
import { invalidatePostsCache } from '../services/cache';

let sentimentQueue: Queue;
let sentimentWorker: Worker;

const SERVER_ROLE = process.env.SERVER_ROLE || 'all';

const initializeMessageBroker = () => {
    const connection = new IORedis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        maxRetriesPerRequest: null,
    });

    // Initialize queue for all server roles
    sentimentQueue = new Queue('sentiment', { connection });
    console.log('Sentiment queue initialized');

    // Initialize worker only for 'all' or 'worker' roles
    if (SERVER_ROLE === 'all' || SERVER_ROLE === 'worker') {
        sentimentWorker = new Worker('sentiment', analyseSentiment, { connection });
        console.log('Sentiment worker initialized');
    }
};

const analyseSentiment = async (job: Job) => {
    const { postId } = job.data;
    console.log(`Analyzing sentiment for post ID: ${postId}`);

    const posts = await db.select().from(postsTable).where(eq(postsTable.id, postId)).execute();
    const post = posts[0];

    if (!post) {
        console.error(`Post with ID ${postId} not found`);
        return;
    }

    const analysisResult = await textAnalysis(post.content);

    await db.update(postsTable)
        .set({
            sentiment: analysisResult.sentiment,
            correction: analysisResult.correction,
        })
        .where(eq(postsTable.id, postId))
        .execute();

    // Invalidate cache after sentiment analysis updates the post
    await invalidatePostsCache();

    console.log(`Sentiment analysis completed for post ID: ${postId}`);
};

export { sentimentQueue, initializeMessageBroker };