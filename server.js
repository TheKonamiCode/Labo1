const hostname = '127.0.0.1';
const port = 5000;
const server = require('./route.js'); // importer les routes
//const PORT = process.env.PORT || 5000;
// require('http').createServer((req, res) => {
//   console.log("allo");

//   ShowRequestInfo(req);

//   if(true || !CORS_Prefligth(req, res)) {
//     if (!API_Endpoint(req, res)) {
//       notFound(res);
//     }
//   }
// })
server.listen(port, hostname, () => {
  console.log('Serveur en exécution sur http://' + hostname + ':' + port + '/');
});