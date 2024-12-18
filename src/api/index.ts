import type { Express } from 'express'
import { initializePostsAPI } from './posts'

export const initializeAPI = (app: Express) => {
    initializePostsAPI(app)
}