const http = require('http');
const connectDB = require('./db.js');

const generateAndInsertCustomers = require('./schema.js');

connectDB();
generateAndInsertCustomers(10);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello, world! This is a simple server in Node.js.');
});

server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
