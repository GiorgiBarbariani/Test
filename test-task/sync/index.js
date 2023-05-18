const http = require('http');
const insertAnonymizedCustomer = require('./db.js');


insertAnonymizedCustomer();

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, world! This is a simple server in Node.js.');
  });


server.listen(process.env.PORT, () => {
    console.log('Server is running on port 3001');
});
  