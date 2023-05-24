import fs from 'fs';
import fetch from 'node-fetch';

const url = 'http://genealogic-tree-back:3001/api/documents/new-full';

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const retryFetch = (
  url,
  fetchOptions = {},
  retries = 10,
  retryDelay = 3000,
  timeout
) => {
  return new Promise((resolve, reject) => {
    // check for timeout
    if (timeout) setTimeout(() => reject('error: timeout'), timeout);

    const wrapper = (n) => {
      fetch(url, fetchOptions)
        .then((res) => resolve(res))
        .catch(async (err) => {
          if (n > 0) {
            await delay(retryDelay);
            wrapper(--n);
          } else {
            reject(err);
          }
        });
    };

    wrapper(retries);
  });
};


fs.readFile('src/data.json', 'utf8',  (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    process.exit(1);
  }

  for (const jsonData of JSON.parse(data)) {

    retryFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        console.log('Response Code:', response.status);
        return response.text();
      })
      .then((responseText) => {
        console.log('Response Content:', responseText);
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  };
});