var fs = require("fs"),
    request = require("request");

var url = 'http://localhost:8888/files';
var req = request.post(url, (err, res, body) => {
      if (err) {
        console.log('Error');
      } else {
        console.log(body);
      }
    });

var stream = fs.createReadStream("./files/1.png");
stream.pipe(req);
