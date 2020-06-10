const express = require('express');
const next = require('next');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./server/middlewares/authentication')

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use('/api/images', express.static(__dirname + '/server/uploads/site'));
    server.use(cookieParser());
    server.use(express.json());

    // middlewares
    server.use(fileUpload({  
      createParentPath: true
    }));
    server.use(authMiddleware);
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(morgan('dev'));

    //routers
    require("./server/routes/users")(server);
    require("./server/routes/settings")(server);

    server.get('/signin', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signin', req.query);
      }
    });

    server.get('/signup', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
