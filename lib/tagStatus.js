import axios from 'axios';

function tagStatus(tagId) {
  const base = 'http://localhost:8888';

  const requester = axios.create({
    baseURL: base,
    timeout: 1000
  });

  return new Promise((success, reject) => {
    requester
      .get(`tags/${tagId}`)
      .then(res => success(res.data))
      .catch(e => reject(e));
  });
}

export default tagStatus;
