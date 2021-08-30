#!/bin/bash
cd /home/ubuntu/exercisetoday/server
authbind --deep pm2 start app.js
