const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');

const app = express();
app.use(express.json());



// database connection
const dbURI = 'mongodb://127.0.0.1:27017/ubudozi_db'; // Local MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to local MongoDB");
    app.listen(3001);
  })
  .catch((err) => console.log(err));

  app.get('/', (req, res) => res.render('home'));
  app.use('/api', require('./routes/authRoutes'));
  app.listen(3000,)