#!/bin/bash
cd /home/ubuntu/exercisetoday/server
authbind --deep pm2 start app.js


# #!/bin/bash
# cd /home/ubuntu/exercisetoday/server

# export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
# export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
# export KAKAO_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

# authbind --deep pm2 start app.js