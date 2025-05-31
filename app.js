import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabse from './database/mongodb.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

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
