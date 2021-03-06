/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

// * Importing packages
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('./socket');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
//Importing Enviroment Variables
require('dotenv').config();

let PORT = process.env.PORT || 8080;

// var corsOptions = {
//   origin: 'http://localhost:4200',
// };
app.use(compression()); //Compress all routes
app.use(helmet()); // Will protect from known vulnerabilities
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Importing Routes

require('./routes/auth')(app);
require('./routes/stories')(app);

// * Initialize mongoose and start service
mongoose
  .connect(
    'mongodb+srv://hanish:3LWjfW78hUrAs8U@readcountsystem.ynftu.mongodb.net/pratilipi?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    const server = app.listen(PORT);
    const io = require('./socket').init(server);
  })
  .catch((err) => {
    console.log(err);
  });
