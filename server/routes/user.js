const userController = require('../controllers/user/index');
const signInController = require('../controllers/user/signin');
const signOutController = require('../controllers/user/signout');
const signUpController = require('../controllers/user/signup');
const photoController = require('../controllers/user/photo');
const challengeController = require('../controllers/user/challenge');

const express = require('express');
const router = express.Router();


// 수정 put /user
router.put('/', userController.put);

// 탈퇴 delete /user
router.delete('/', userController.delete);

// 로그인 post /user/signin
router.post('/signin', signInController.post);

// 로그아웃 post /user/signout
router.post('/signout', signOutController.post);

// 가입 post /user/signup
router.post('/signup', signUpController.post);

// 프사 get /user/photo
router.get('/photo', photoController.get);

// 프사 put /user/photo
router.put('/photo', photoController.put);

// 진행, 완료 챌린지 get /user/challenge
router.get('/challenge', challengeController.get);


module.exports = router;