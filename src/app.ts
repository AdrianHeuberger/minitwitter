import express from 'express';
import { json } from 'body-parser';
import { registerUser, loginUser } from './controllers/userController';
import { createPost, getPosts, updatePost, deletePost } from './controllers/postController';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
app.use(json());

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.use(authMiddleware);

app.post('/api/posts', createPost);
app.get('/api/posts', getPosts);
app.put('/api/posts/:id', updatePost);
app.delete('/api/posts/:id', deletePost);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});





