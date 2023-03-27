const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./router/blogRouter')
const path = require('path');
require('dotenv').config()

// express app
const app = express();
// connect to mongodb & listen for requests
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_COLLECTION, MONGO_DB } = process.env;
const dbURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_COLLECTION}.93jeyrb.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});