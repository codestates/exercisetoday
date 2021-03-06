const commentController = require('../controllers/challenge/comment');
const progressRateController = require('../controllers/challenge/progressrate');
// ! const commentLikeController = require('../controllers/challenge/commentlike');
const express = require('express');
const router = express.Router();

// TODO 주석 해제하고 해당 루트 들어가서 작업

// 댓글 보기 get /challenge/comment
router.get('/comment', commentController.get);

// 댓글 쓰기 post /challenge/comment
router.post('/comment', commentController.post);

// 진행도 보기 get /challenge/progressrate
router.get('/progressrate', progressRateController.get);

// 진행도 도전 시작 post /challenge/progressrate
router.post('/progressrate', progressRateController.post);

// 진행도 변경 put /challenge/progressrate
router.put('/progressrate', progressRateController.put);

// ! Advanced - 댓글 좋아요 post /challenge/commentlike
// router.post('/commentlike', commentLikeController.post);




module.exports = router;