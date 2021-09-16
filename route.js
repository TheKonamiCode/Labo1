const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

  AccessControlConfig(res);
  if (!Prefligth(req, res)) {
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
  }
});

function AccessControlConfig(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
}
function Prefligth(req, res) {
  if (req.method === 'OPTIONS') {
      console.log('preflight CORS verifications');
      res.end();
      // request handled
      return true;
  }
  // request not handled
  return false;
}