module.exports = {
  post: (req, res) => { 

    const token = req.headers.authorization;
    
    if(token.split(" ")[0] === "jwt") {
      res.status(200).json({
        data : null,
        message : 'jwt signed out successfully'
      })
    }
    
    if(token.split(" ")[0] === "kakao") {
      res.status(200).json({
        data : null,
        message : 'kakao signed out successfully'
      })
    }


  }
}
