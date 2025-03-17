import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('posts', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    content: varchar({ length: 255 }).notNull(),
    sentiment: varchar({ length: 80 }),
    correction: varchar({ length: 255 }),
    userId: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const usersTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
});