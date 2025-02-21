import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { usersTable } from '../db/schema';

const JWT_SECRET = process.env.JWT_SECRET!;

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

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await db.select().from(usersTable).where(usersTable.username.eq(username)).single();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
};
