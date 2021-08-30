const express = require('express');
const router = express.Router();


// 테스트용 ROOT 라우트
router.get('/', (req, res) => {
  res.send('HI EXERCISE TODAY SERVER!')
});

module.exports = router;