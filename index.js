import fs from 'fs';
import request from 'request';

const url = 'http://localhost:8888/files';

const req = request.post(url, (err, res, body) => {
  if (err) {
    console.log('Error');
  } else {
    console.log(body);
  }
});

const stream = fs.createReadStream('./files/1.png');
stream.pipe(req);
