/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

// * Importing packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//Importing Enviroment Variables
require('dotenv').config();

let PORT = process.env.DEV_APP_PORT;

var corsOptions = {
  origin: 'http://localhost:7777',
};

const server = require('http').createServer(app);
exports.io = require('socket.io')(server);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Importing Routes
// const storyRoute = require('./routes/stories');
// app.use(storyRoute);
require('./routes/auth')(app);
require('./routes/stories')(app);

// * Initialize mongoose and start service
mongoose
  .connect(process.env.DEV_MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log('server listening');
    });
  })
  .catch((err) => {
    console.log(err);
  });
