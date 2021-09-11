const http = require('http');
const url = require('url');

// Matière à discussion
// https://stackoverflow.com/questions/21001455/should-a-rest-api-be-case-sensitive-or-non-case-sensitive
// https://blog.restcase.com/5-basic-rest-api-design-guidelines/

module.exports = http.createServer((req, res) => {
  var controller = require('./controller.js');
  const reqUrl =  url.parse(req.url, true);
  const pathName = reqUrl.pathname;
  if( pathName == '/math' && req.method === 'GET') {

    controller.math(req, res);
  }
 else {
  console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
  controller.invalidUrl(req, res);
}
  // // GET endpoint
  // else if(reqUrl.pathname == '/getCours' && req.method === 'GET') {
  //   console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
  //   coursOps.getCours(req, res);
  // // POST endpoint
  // } else if(reqUrl.pathname == '/createCours' && req.method === 'POST') {
  //   console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
  //   coursOps.createCours(req, res);
  // // URL invalide
  // } else {
  //   console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
  //   coursOps.invalidUrl(req, res);
  // }
})