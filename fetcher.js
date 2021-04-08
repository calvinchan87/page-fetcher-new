// INPUT
// node fetcher.js http://www.example.edu/ ./index.html

fs = require('fs');

const args = process.argv.slice(2);

if (args[1].startsWith('.') === false) {
  args[1] = './' + args[1];
};

if (args[1].endsWith('.html') === false) {
  console.log('Enter a valid local file path ending with .html')
  return;
};

const request = require('request');
request(args[0], (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  if (error !== null || response.statusCode !== 200) {
    (console.log('Terminating app: Error or non-200 result'));
    return;
  }
  fs.writeFile(args[1], body, function (err) {
    if (err) return console.log(err);
    console.log(`Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}`);
  })
});

// OUTPUT
// Downloaded and saved 3261 bytes to ./index.html