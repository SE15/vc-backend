require('dotenv').config()
const express = require('express'),
    http = require('http');
const HttpStatus = require('http-status');
const bodyParser = require('body-parser');
const cors = require("cors");

const hostname = 'localhost';
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>Hello world!</h1></body></html>');
// });

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//user Routes
const usersRoutes = require('./routes/api/users');
app.use('/api', usersRoutes);

//guest Routes
const guestsRoutes = require('./routes/api/guests');
app.use('/api/guests', guestsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = HttpStatus.NOT_FOUND;
    err.log = "not found";
    next(err);
  });
  
  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use((err, req, res, next) => {
    if (err.status === 404) {
        const response = {
            err: 1,
            obj: {},
            msg: "Not found"
        }
        return res.json(response);
    } else {
        const response = {
            err: 1,
            obj: {},
            msg: "Exception occured"
        }
        return res.json(response);
    }
  });