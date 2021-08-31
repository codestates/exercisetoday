module.exports = {
  post: (req, res) => { 

    const token = req.headers.authorization;
    const origin = "";
    
    if(token.split(" ")[0] === "jwt") {
      res.status(200).json({
        data : null,
        message : 'Signed out successfully'
      })
    }

    res.status(200).json({
      data : null,
      message : 'Signed out successfully'
    })


  }
}
