const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Userdetails, connectToDatabase } = require('./dbschemas');


const app = express();
const port = 3001;

connectToDatabase();

app.use(cors());
app.use(bodyParser.json());

app.post('/popupdata', async (req, res) => {
  const { email, age, gender, weight, height, dietarypreferences, allergies, healthgoals } = req.body;

  try {
    const userdetails = new Userdetails({
      email: email,
      age: age,
      gender: gender,
      weight: weight,
      height: height,
      dietarypreferences: dietarypreferences,
      allergies: allergies,
      healthgoals: healthgoals
    });

    const saveduserdetails = await userdetails.save();
    console.log(saveduserdetails);
    res.status(200).json(saveduserdetails);
  } catch (error) {
    console.error('Error creating suggestion:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/fetchpopupdata', async (req, res) => {
  try {
    const pop = await Userdetails.find();
    res.json(pop);
  } catch (e) {
    console.log(e);
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});