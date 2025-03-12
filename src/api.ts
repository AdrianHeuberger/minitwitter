import { type Express } from 'express'
import { initializePostsAPI } from './api/posts'
import { initializeAuthAPI } from './api/auth';


export const initializeAPI = (app: Express) => {
  initializePostsAPI(app);
  initializeAuthAPI(app);
}