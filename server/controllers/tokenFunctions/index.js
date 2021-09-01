require('dotenv').config();
const qs = require('qs');
const { default: axios } = require('axios');
const { sign, verify } = require('jsonwebtoken');
const clientID = process.env.KAKAO_CLIENT_ID;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;

module.exports = {
  // jwt 토큰 sign
  generateJwtToken: (data) =>{
    // TODO: data password 지우고 sign
    const token = sign(data, process.env.ACCESS_SECRET,{
      expiresIn: "2h"
    });
    return token;
  },
  // jwt 토큰 verify
  isJwtAuthorized: (token) => {
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
  // jwt 토큰 쿠키 담아보내기
  sendJwtToken: (res, token, data) =>{
    res.cookie("jwt", token/*,{
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }*/);
    res.status(200).json({
      data: data,
      message: "ok, jwt token is created in your cookie",
      token: token
    });
  }
}
