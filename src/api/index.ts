import type { Express } from 'express'
import { initializePostsAPI } from './posts'
import  authMiddleware from './auth-middleware'
import { initializeAuthAPI } from './auth'
import { limiter } from './rate-limiter'
import { httpLogger} from '../services/logger'


export const initializeAPI = (app: Express) => {
      // Use the auth middleware
  app.use(authMiddleware)
  app.use(httpLogger)

  // Initialize APIs
  initializePostsAPI(app)
  initializeAuthAPI(app)
}
