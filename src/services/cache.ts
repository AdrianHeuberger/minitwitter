import { desc, eq } from 'drizzle-orm'
import { db } from '../database'
import { postsTable, usersTable } from '../db/schema'
import IORedis from 'ioredis'

const CACHE_ACTIVE = (process.env.CACHE_ACTIVE || 'true') === 'true' // im unterricht wurde hier ein Fehler gemacht, muss ich noch nachschauen ab11 2b

let redis: IORedis

// Add initialization in app.ts
export const initializeCache = async () => {
  if (redis || !CACHE_ACTIVE) return
  console.log('Initializing Redis Cache...')
  redis = new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    maxRetriesPerRequest: null,
  })
  console.log('Redis Cache initialized')
}

type Posts = Awaited<ReturnType<typeof getPostsFromDB>>

export const getPosts = async (userId?: number) => {
  // 1. Check if Cache is active
  if (!CACHE_ACTIVE) {
    const posts = await getPostsFromDB();
    return filterPosts(posts, userId);
  }

  // 2. If cache active: Get posts from cache
  let posts = await getPostsFromCache();
  
  // 2.1 If posts are in cache, return them
  if (posts) {
    return filterPosts(posts, userId);
  }

  // 2.2 If posts are not in cache, get them from database
  posts = await getPostsFromDB();
  
  // 2.3 Store posts in cache
  await setPostsInCache(posts);
  
  // 4. Filter posts and return them
  return filterPosts(posts, userId);
}

const getPostsFromCache = async () => {
  try {
    const cachedPosts = await redis.get('posts');
    return cachedPosts ? JSON.parse(cachedPosts) : null;
  } catch (error) {
    console.error('Error getting posts from cache:', error);
    return null;
  }
}

const getPostsFromDB = async () => {
  return await db.select()
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .orderBy(desc(postsTable.id))
    .execute();
}

const setPostsInCache = async (posts: Posts) => {
  try {
    await redis.set('posts', JSON.stringify(posts));
  } catch (error) {
    console.error('Error setting posts in cache:', error);
  }
}

export const invalidatePostsCache = async () => {
  try {
    await redis.del('posts');
  } catch (error) {
    console.error('Error invalidating posts cache:', error);
  }
}

// Helper function to filter posts
const filterPosts = (posts: Posts, userId?: number) => {
  if (!userId) return posts;
  return posts.filter(post => 
    post.sentiment !== 'dangerous' || post.userId === userId
  );
}