import fs from 'fs';
import request from 'request';

import tagStatus from './lib/tagStatus';

const url = 'http://localhost:8888/files';

const req = request.post(url, (err, res, body) => {
  if (err) {
    console.log('Error');
  } else {
    console.log(body);

    const tagId = res.headers['swarm-tag-uid'];

    setInterval(() => {
      tagStatus(tagId)
        .then(console.log)
        .catch(e => `Error: ${e}`);
    }, 1000);
  }
});

const stream = fs.createReadStream('./files/1.png');
stream.pipe(req);
