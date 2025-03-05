import { Job, Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { db, postsTable } from '../database';
import { eq } from 'drizzle-orm';
import { textAnalysis } from '../services/ai';

let sentimentQueue: Queue;
let sentimentWorker: Worker;

const initializeMessageBroker = () => {
    const connection = new IORedis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        maxRetriesPerRequest: null,
    });

    sentimentQueue = new Queue('sentiment', { connection });
    sentimentWorker = new Worker('sentiment', analyseSentiment, { connection });
    console.log('Message Worker Initialized');
};

const analyseSentiment = async (job: Job) => {
    const jobData = job.data;
    console.log(jobData);
    // 1. Generate job when new post is created with the post id (in qsi/posts.is POST/PUT endpoint)
    // see in api/posts.ts
    // 2. Fetch the post from the database
    const postId = jobData.postId;
    const posts = await db.select().from(postsTable).where(eq(postsTable.id, postId)).execute();
    const post = posts[0];

    if (!post) {
        console.error(`Post with ID ${postId} not found`);
        return;
    }

    // 3. Analyze the sentiment of the post (services/ai.ts -> textAnalysis)

    const analysisResult = await textAnalysis(post.content);

    // 4. Update the post with the sentiment
    await db.update(postsTable)
        .set({
            sentiment: analysisResult.sentiment,
            correction: analysisResult.correction,
        })
        .where(eq(postsTable.id, postId))
        .execute();

    console.log(`Sentiment analysis completed for post ID: ${postId}`);
};

export { sentimentQueue, initializeMessageBroker };