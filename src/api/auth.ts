import { type Express, type Request, type Response } from 'express'
import { db } from '../database'
import { postsTable } from '../db/schema'
import { eq } from 'drizzle-orm'

export const initializeAuthAPI = (app: Express) => {
    app.post('/api/auth/register', async (req: Request, res: Response) => {
        const { username, password } = req.body
        // Insert a new user into the database
    })
}