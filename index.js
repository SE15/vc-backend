require('dotenv').config()
const express = require('express'),
    http = require('http');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 5000;

const app = express();
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
const userseRoutes = require('./routes/api/users');
app.use('/api', usersRoutes);

//guest Routes
const guestsRoutes = require('./routes/api/guests');
app.use('/api/guests', guestsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  // no stacktraces leaked to user unless in development environment
  app.use((err, req, res, next) => {
    if (err.status === 404) {
        return res.json({msg: err});
    } else {
        return res.json({msg: err});
    }
  });