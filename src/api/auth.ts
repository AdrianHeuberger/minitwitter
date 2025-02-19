import { type Express, type Request, type Response } from 'express'
import { db } from '../database'
import { usersTable } from '../db/schema'
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
    app.post('/api/auth/login', async (req: Request, res: Response) => {
        const { username, password } = req.body

        try {
            const existingUsers = await db.select().from(usersTable).where(eq(usersTable.username, username))
            if (existingUsers.length === 0) {
                res.status(401).send({ error: 'Invalid username or password.' })
                return
            }

            const existingUser = existingUsers[0]
            const passwordMatch = await bcrypt.compare(password, existingUser.password)
            if (!passwordMatch) {
                res.status(401).send({ error: 'Invalid username or password.' })
                return
            }

            res.send({ id: existingUser.id, username: existingUser.username })
        } catch (error) {
            res.status(500).send({ error: 'Error logging in user' })
        }
    })
}
