import type { Express } from 'express'
import { initializePostsAPI } from './posts'
import authMiddleware from './auth-middleware'
import { initializeAuthAPI } from './auth'

export const initializeAPI = (app: Express) => {
      // Use the auth middleware
  app.use(authMiddleware)

  // Initialize APIs
  initializePostsAPI(app)
  initializeAuthAPI(app)
}
