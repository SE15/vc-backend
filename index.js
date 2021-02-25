require('dotenv').config()
const express = require('express'),
    http = require('http');
const HttpStatus = require('http-status');
const cors = require("cors");

const hostname = 'localhost';
const port = 5000;

const app = express();

app.use(require('./middlewares/request-logger'));

const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.use(require('./middlewares/unknown-endpoint'));
app.use(require('./middlewares/error-handler'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});