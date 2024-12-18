import { type Express, type Request, type Response } from 'express'
import { db } from '../database'
import { postsTable } from '../db/schema'
import { eq } from 'drizzle-orm'


export const initializePostsAPI = (app: Express) => {
    app.get('/api/posts', async (req: Request, res: Response) => {
        const posts = await db.select().from(postsTable)
        res.send(posts)
    })

    app.post('/api/posts', async (req: Request, res: Response) => {
        const newPost = await db.insert(postsTable).values(req.body).returning()
        res.send(newPost[0])
    })

      // PUT-Function to update an existing content
  app.put('/posts/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    await db.update(postsTable).set(req.body).where(eq(postsTable.id, id))
    res.send('OK')
  })

  // DELETE-function to delete contents
  app.delete('/posts/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    await db.delete(postsTable).where(eq(postsTable.id, id))
    res.send('OK')
  })
}
