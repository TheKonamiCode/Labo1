const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
  var controller = require('./controller.js');
  const reqUrl = url.parse(req.url, true);
  const pathName = reqUrl.pathname;
  if (pathName == '/api/maths' && req.method === 'GET') {

    controller.math(req, res);
  }
  else {
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    controller.invalidUrl(req, res);
  }
})