// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userId = 'arpitagaur_05';
const email = 'arpitagaur93@gmail.com';
const rollNumber = '1234';

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const numbers = [];
  const alphabets = [];
  let highestAlphabet = '';

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
      if (item.toLowerCase() > highestAlphabet.toLowerCase()) {
        highestAlphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_alphabet: [highestAlphabet],
  });
});

app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});