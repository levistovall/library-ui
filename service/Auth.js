var fetch = require('node-fetch');

var auth = {
   validate_token: function(req, res, next) {
                       fetch('http://'+process.env.AUTH_SERVER_IP+':'+process.env.AUTH_SERVER_PORT+'/users')
                           .then(res => res.json())
                           .then(json => console.log(json));
   },
   login: function(req, res, next) {
                       fetch('http://'+process.env.AUTH_SERVER_IP+':'+process.env.AUTH_SERVER_PORT+'/login')
                           .then(res => res.json())
                           .then(json => console.log(json));
   }
};

module.exports = auth;
