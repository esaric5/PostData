import fs from 'fs';
import request from 'request';

import colors from 'colors';

import tagStatus from './lib/tagStatus';

const swarmPort = '8888';

const url = `http://localhost:${swarmPort}/files`;

const req = request.post(url, (err, res, body) => {
  if (err) {
    console.log('Error');
  } else {
    const { reference } = JSON.parse(body);
    console.log(`Swarm hash: ${colors.green(reference)}`);

    const tagId = res.headers['swarm-tag-uid'];

    console.log(`swarm-tag-uid: ${colors.yellow(tagId)}`);

    setInterval(() => {
      tagStatus({ tagId, swarmPort })
        .then(console.log)
        .catch(e => `Error: ${e}`);
    }, 2000);
  }
});

const args = process.argv.slice(2);

let filePath = './files/1.png';

if (args.length == 0) {
  console.log('Usage:');
  console.log(`${colors.green('upload.js [filePath]')} ${colors.gray('uploads file to Swarm network via local Swarm node on port ${port}')}`);
  console.log();
  console.log(`Now uploading a test file...`);
} else {
  filePath = args[0];
}

console.log(`Uploading ${colors.cyan(filePath)} to Swarm client on port ${colors.yellow(swarmPort)}`);
console.log();

const stream = fs.createReadStream(filePath);
stream.pipe(req);
