import express from 'express';
import { json } from 'body-parser';
import { initializeAPI } from './api';

const app = express();
app.use(json());

initializeAPI(app);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});





