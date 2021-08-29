require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const port = 80;

// const controllers = require('./controllers');

const rootRouter = require('./routes/root');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const challengeRouter = require('./routes/challenge');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin : true
  })
);
app.use(cookieParser());
//controllers안에 있는 파일

// app.get('/auth', controllers.auth);
// app.get('/user', controllers.user);
// app.get('/challenge', controllers.challenge);

app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/challenge', challengeRouter);

app.get('/', (req, res) => {
  res.send('HI EXERCISE TODAY SERVER!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})