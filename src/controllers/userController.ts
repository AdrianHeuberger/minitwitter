import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db';
import { usersTable } from '../db/schema';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.insert(usersTable).values({ username, password: passwordHash }).returning();

    res.send({ id: newUser[0].id, username: newUser[0].username });
  } catch (error) {
    res.status(500).send({ error: 'Error registering user' });
  }
};
