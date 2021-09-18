exports.invalidUrl = function (req, res) {
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
    option: "api/maths",
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

  let valid = true;

  if (op == "" || op == null) {

    valid = false;
    keyValue = "'op' parameter is missing";
  }
  else if (op != " " && op != "-" && op != "*" && op != "/" && op != "%" && op != "!" && op != "p" && op != 'np') {

    valid = false;
    keyValue = "unknown operation";
  }
  else if (((op == " " || op == "-" || op == "*" || op == "/" || op == "%") && nbParams > 3) || ((op == "!" || op == "p" || op == 'np') && nbParams > 2)) {

    valid = false;
    keyValue = "too many parameters";
  }
  else if (((op == " " || op == "-" || op == "*" || op == "/" || op == "%") && nbParams < 3) || ((op == "!" || op == "p" || op == 'np') && nbParams < 2)) {

    valid = false;
    keyValue = "not enough parameters";
  }
  else if (nbParams == 3) {

    const xParam = params.get('x');
    const yParam = params.get('y');

    if (xParam == "" || xParam == null) {

      valid = false;
      keyValue = "'x' parameter is missing";
    }
    else if (yParam == "" || yParam == null) {

      valid = false;
      keyValue = "'y' parameter is missing";
    }
    else {

      const x = Number(xParam);
      const y = Number(yParam);
      if (isNaN(x)) {

        valid = false;
        keyValue = "parameter value of x is not a numbers";
      }
      else if (isNaN(y)) {

        valid = false;
        keyValue = "parameter value of y is not a numbers";
      }
      else {
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

          if (y == 0 && x == 0) {
            keyValue = "NaN";
          }
          else if (y == 0) {
            keyValue = "Infinity";
          }
          else {
            keyValue = x / y;
          }
        }
        else if (op == '%') {

          if (y == 0) {
            keyValue = "NaN";
          }
          else {
            keyValue = x % y;
          }
        }
      }
    }
  }
  else if (nbParams == 2) {

    const nParam = params.get('n');
    if (nParam == null) {

      valid = false;
      keyValue = "'n' parameter is missing";
    }
    else {

      const n = Number(nParam);
      if (isNaN(n)) {

        valid = false;
        keyValue = "parameter value of n is not a number";
      }
      else if (op == '!') {

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
    }

  }
  else {

    valid = false;
    keyValue = "How did you even got here?????";
  }

  let response = {};

  for (const [key, value] of params.entries()) {

    response[key] = value;
  }

  if (valid) {

    response["value"] = keyValue;
  }
  else {

    response["error"] = keyValue;

    res.statusCode = 422;
  }
  
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