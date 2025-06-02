import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabse from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// Middlewares
app.use(express.json()); // Middleware for handling JSON data
app.use(express.urlencoded({ extended: false })); // Middleware for handling html form data
app.use(cookieParser()); // Middleware for handling cookies
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Middleware for handling errors
app.use(errorMiddleware);

app.checkout('/', (req, res) => {
  res.send('Welcom to Subscription Tracker API');
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );

  await connectToDatabse();
});

export default app;
