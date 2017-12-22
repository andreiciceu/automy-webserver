# Installation
`npm install`  
`cd react-ui && npm install`  
`cd ..`  

## Dev
Express will run on port 3001: `node bin/www`  
React   will run on port 3000: `cd react && npm start`  

## Prod
For access on port 80, using ip tables is an option:
`sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3001`  
Add as pm2 service `pm2 start bin/www --name automy-web`  
Auto-load on restart with `pm2 save`  
