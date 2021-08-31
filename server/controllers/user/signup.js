module.exports = {
  post: (req, res) => { 
    const userData = req.body;

    // TODO Sequelize 생성 findOrCreate
    // // 이미 있으면
    // res.status(409).json({
    //   data : null,
    //   message : `${email} already exists`
    // });

    // // 서버에러
    // res.status(500).send();

    delete userData.user_password

    res.status(201).json({
      data : {
        ...userData, 
        user_id: 24,
        user_kakaoId: null,
        user_exp: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      message: 'ok'
    });
  }
}