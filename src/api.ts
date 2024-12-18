import { type Express } from 'express'
import { initializePostsAPI } from './api/posts'

export const initializeAPI = (app: Express) => {
  initializePostsAPI(app);
}