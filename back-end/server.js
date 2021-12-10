const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cr4', {
  useNewUrlParser: true
});

// Create a new meme in the museum: takes a title and a path to an image.
app.post('/api/memes', async (req, res) => {
  const meme = new Meme({
    title: req.body.title,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    path: req.body.path,
  });
  try {
    await meme.save();
    res.send(meme);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete an meme
app.delete('/api/memes/:id', async (req, res) => {
  try {
    await Meme.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Edit an meme
app.put('/api/memes/:id', async (req, res) => {
  try {
    let meme = await Meme.findOne({
      _id: req.params.id
    });
    meme.title = req.body.title;
    meme.likes = req.body.likes;
    meme.dislikes = req.body.dislikes
    await meme.save();
    res.send(meme);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/cr4/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for memes in the museum: a title and a path to an image.
const memeSchema = new mongoose.Schema({
  title: String,
  likes: Number,
  dislikes: Number,
  path: String,
});

// Create a model for memes in the museum.
const Meme = mongoose.model('Meme', memeSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Get a list of all of the memes in the museum.
app.get('/api/memes', async (req, res) => {
  try {
    let memes = await Meme.find();
    res.send(memes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
