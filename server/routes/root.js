const express = require('express');
const router = express.Router();


// 테스트용 ROOT 라우트
router.post('/', (req, res) => {

  const reqbodydata = req.body.data;

  res.status(200).json({
    data: {
      "user_id": 1,
      "user_email": "myemail@gmail.com",
      "user_password": "123456",
      "user_name": "오하운",
      "user_nickname": "오계란",
      "user_gender": "male",
      "user_mobile": 01011111111,
      "user_exp": 42,
      "user_photo": null,
      "createdAt": new Date(),
      "updatedAt": new Date(),
      "reqbody": reqbodydata     
    },
    message: 'TEST ok, server connected!'
  })
});

module.exports = router;