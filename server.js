/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

// * Importing packages
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();

//Importing Enviroment Variables
require('dotenv').config();

let PORT = process.env.DEV_APP_PORT;

app.use(bodyParser.urlencoded({ extended: false }));

// * Initialize mongoose and start service
mongoose
  .connect(process.env.DEV_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('server listening');
    });
  })
  .catch((err) => {
    console.log(err);
  });
