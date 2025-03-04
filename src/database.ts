import 'dotenv/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from './db/schema'

type DBSchema = NodePgDatabase<typeof schema>

const db: DBSchema = drizzle(process.env.DATABASE_URL!)
export { db }
export const postsTable = pgTable('posts', { 
    id: integer().primaryKey().generatedAlwaysAsIdentity(), 
    content: varchar({ length: 255 }).notNull(), 
    sentiment: varchar({ length: 80 }), 
    correction: varchar({ length: 255 }), 
    userId: integer() 
      .notNull() 
      .references(() => usersTable.id, { onDelete: 'cascade' }), 
  }) 