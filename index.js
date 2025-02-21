const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin : "*"

}));
app.use(express.json());

const user_id = 'john_doe_17091999'; 
const email = 'john@xyz.com'; 
const roll_number = 'ABCD123';

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: 'Invalid input: data must be an array' });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

    const highest_alphabet = alphabets.length > 0
      ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
      : [];

    const response = {
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

app.get('/bfhl', (req, res) => {
  try {
    res.status(200).json({ operation_code: 1 });
  } catch (error) {
    res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
