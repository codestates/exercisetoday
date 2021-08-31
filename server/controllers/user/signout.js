module.exports = {
  post: (req, res) => { 

    const kakao = req.cookies.kakao;
    const jwt = req.cookies.jwt;

    if(kakao) {
      res.clearCookie('jwt');
    }
    if(jwt) {
      res.clearCookie('jwt');
    }

    res.status(200).json({
      data : null,
      message : 'Signed out successfully'
    })


  }
}
