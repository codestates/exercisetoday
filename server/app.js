require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const port = process.env.PORT || 80;


// 라우팅 위치 설정
const rootRouter = require('./routes/root'); // Root 라우트는 테스트용. 실제로는 사용되지 않을 예정.
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const challengeRouter = require('./routes/challenge');


// 데이터 가공
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// CORS 설정
app.use(
  cors({
    origin : false
  })
);


// 쿠키 설정
app.use(cookieParser());
//controllers안에 있는 파일

// app.get('/auth', controllers.auth);
// app.get('/user', controllers.user);
// app.get('/challenge', controllers.challenge);



// 라우팅
app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/challenge', challengeRouter);




app.get('/', (req, res) => {
  res.send('HI EXERCISE TODAY SERVER!')
})





app.listen(port, () => {
  console.log(`Exercise Today app listening at http://localhost:${port}`)
})

module.exports = app;
