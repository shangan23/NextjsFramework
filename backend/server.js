const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const authentication = require('./server/middlewares/authentication')
const port = parseInt(process.env.PORT, 10) || 3001;
const server = express();

//static/public directory
server.use('/api/images', express.static(__dirname + '/server/uploads/site'));

//middlewares
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(authentication);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('dev'));

//routers
require("./server/routes/settings")(server);
require("./server/routes/users")(server);
require("./server/routes/dynamic")(server);

//server startup
server.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
