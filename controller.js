exports.invalidUrl = function(req, res) {
  var response = [
    {
      "message": "Incorrect Endpoint. The possible option is "
    },
    availableEndpoints
  ]
  res.statusCode = 404;
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}

const availableEndpoints = [
  {
    method: "GET",
    option: "/maths",
  },
]

exports.math = function (req, res) {

  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const params = new URLSearchParams(reqUrl.search);

  let key = "value";
  let keyValue = "null";
  res.statusCode = 200;

  const op = params.get('op');

  const nbParams = Array.from(params.entries()).length;
  if (nbParams == 3) {

    const x = Number(params.get('x'));
    const y = Number(params.get('y'));
    if (op != null && x != null && y != null)
      if (!isNaN(x) && !isNaN(y)) {

        if (op == ' ') {

          keyValue = x + y;
        }
        else if (op == '-') {
          keyValue = x - y;
        }
        else if (op == '*') {
          keyValue = x * y;
        }
        else if (op == '/') {
          keyValue = x / y;
        }
        else if (op == '%') {
          keyValue = x % y;
        }
        else {

          key = "error";
          keyValue = "parameter value of op does not represent a valid operation";
          res.statusCode = 422;
        }
      }
      else {

        key = "error";
        keyValue = "parameter value of x/y are not numbers";

        res.statusCode = 422;
      }
    else {

      key = "error";
      keyValue = "parameters names are invalid ";

      res.statusCode = 422;
    }
  }
  else if (nbParams == 2) {

    const n = Number(params.get('n'));
    if (n != null) {
      if (!isNaN(n)) {

        if (op == '!') {

          keyValue = 1;
          if (n != 0 && n != 1) {
            for (var i = n; i > 0; --i) {
              keyValue *= i;
            }
          }
        }
        else if (op == 'p') {

          keyValue = isPrime(n);
        }
        else if (op == 'np') {

          let j = 0;
          let nb = 0;
          let lastPrimeNumber = 0;
          while (j < n) {
            if (isPrime(nb)) {
              ++j;
              lastPrimeNumber = nb;
            }
            ++nb;
          }

          keyValue = lastPrimeNumber;
        }
        else {

          key = "error";
          keyValue = "parameter value of op does not represent a valid operation";
          res.statusCode = 422;
        }
      }
      else {

        key = "error";
        keyValue = "parameter value of n is not a number";

        res.statusCode = 422;
      }
    }
    else {

      key = "error";
      keyValue = "parameters names are invalid ";

      res.statusCode = 422;
    }



  }
  else if (nbParams < 2) {

    key = "error";
    keyValue = "Not enough parameter";

    res.statusCode = 422;
  }
  else if (nbParams > 3) {

    key = "error";
    keyValue = "Too many parameters";

    res.statusCode = 422;
  }
  else {

    key = "error";
    keyValue = "How did you even got here?????";

    res.statusCode = 422;
  }

  var response = [
    Object.fromEntries(params),
    {
      key: keyValue
    }
  ];
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

function isPrime(number) {

  let prime = true;

  if (number != 0 && number != 1) {
    for (var i = 2; i < number; ++i) {
      if (number % i == 0) {
        prime = false;
      }
    }
  }
  else {
    prime = false;
  }

  return prime;
}