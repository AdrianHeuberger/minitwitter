import { type Express, type Request, type Response } from 'express'
import { db } from '../database'
import { postsTable, usersTable } from '../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export const initializeAuthAPI = (app: Express) => {
    app.post('/api/auth/register', async (req: Request, res: Response) => {
        const { username, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        // Insert a new user into the database


        const newUser = await db.insert(usersTable).values({
            username, password: passwordHash
        }).returning()
        res.send({ id: newUser[0].id, username: newUser[0].username })
    })
}