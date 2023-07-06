const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    question: String,
    choices: [String],
    answer: String,
  });
  
  const badgeSchema = new mongoose.Schema({
    name: String,
    image: String,
  });
  
  const Question = mongoose.model('Question', questionSchema);
  const Badge = mongoose.model('Badge', badgeSchema);
  const question = new Question({
    question: 'What does "lit" mean?',
    choices: ['Angry', 'Tired', 'Excited', 'Sad'],
    answer: 'Excited',
  });
  const badge = new Badge({
    name: 'Hip Hop Master',
    image: 'https://example.com/badge.png',
  });
  
  badge.save((err, badge) => {
    if (err) return console.error(err);
    console.log('Badge saved:', badge);
  });
  
  question.save((err, question) => {
    if (err) return console.error(err);
    console.log('Question saved:', question);
  });
  
mongoose.connect('mongodb://localhost/hiphopSlangQuiz', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

let questions = [
  // ここに問題を追加します。
  // 例:
  // {
  //   question: 'What does "lit" mean?',
  //   choices: ['Angry', 'Tired', 'Excited', 'Sad'],
  //   answer: 'Excited'
  // },
];

app.get('/api/questions', (req, res) => {
    Question.find((err, questions) => {
      if (err) return console.error(err);
      const question = questions[Math.floor(Math.random() * questions.length)];
      res.json(question);
    });
  });
  
app.get('/api/badges', (req, res) => {
    Badge.find((err, badges) => {
      if (err) return console.error(err);
      res.json(badges);
    });
  });
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
