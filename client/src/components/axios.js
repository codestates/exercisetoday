const axios = require("axios");

axios({
  method: "post",
  url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/",
  data: { data: { userId: "duckwonLee", password: 12345678 } },
}).then((res) => console.log(res.data));
