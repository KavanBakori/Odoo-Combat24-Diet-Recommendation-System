// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { Userdetails, connectToDatabase } = require('./dbschemas');


// const app = express();
// const port = 3001;

// connectToDatabase();

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/popupdata', async (req, res) => {
//   const { email, age, gender, weight, height, dietarypreferences, allergies, healthgoals } = req.body;

//   try {
//     const userdetails = new Userdetails({
//       email: email,
//       age: age,
//       gender: gender,
//       weight: weight,
//       height: height,
//       dietarypreferences: dietarypreferences,
//       allergies: allergies,
//       healthgoals: healthgoals
//     });

//     const saveduserdetails = await userdetails.save();
//     console.log(saveduserdetails);
//     res.status(200).json(saveduserdetails);
//   } catch (error) {
//     console.error('Error creating suggestion:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.get('/fetchpopupdata', async (req, res) => {
//   try {
//     const pop = await Userdetails.find();
//     res.json(pop);
//   } catch (e) {
//     console.log(e);
//   }
// })

// app.get('/', (req, res) => {
//   res.send('Welcome to my server!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Userdetails, connectToDatabase, User } = require('./dbschemas'); // Adjust the path as per your project structure
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const GOOGLE_API_KEY = "AIzaSyAJ2MQ_7kptOIwiIFr4HN9UpRMBfYzm8W4";
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Connect to MongoDB
connectToDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to save user details
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

// Endpoint to generate diet plan
app.post('/generate-diet-plan', async (req, res) => {
  const { email } = req.body; // Assuming email is used as a unique identifier

  try {
    // Fetch user profile from MongoDB
    const user = await Userdetails.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    let prompt = `
        Personalized Diet Plans:
        Customized meal plans based on the following user profile:
        - email: ${user.email}
        - age: ${user.age}
        - gender: ${user.gender}
        - height: ${user.height} cm
        - weight: ${user.weight} kg
        - dietarypreferences: ${user.dietarypreferences}
        - allergies: ${user.allergies}
        - healthgoals: ${user.healthgoals}
        
        Provide daily, weekly, and monthly meal suggestions.
        Include calorie, macronutrient (protein, fat, carbs), and micronutrient (vitamins, minerals) breakdown for each plan.
        `;

    let result = await model.generateContent(prompt);
    console.log('Result:', result); // Log the result to inspect its structure

    // Assuming result.response.text() returns a JSON string, parse it correctly
    try {
      let parsedResult = JSON.parse(result.response.text());
      res.json({ dietPlan: parsedResult }); // Send the parsed JSON back to the client
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Failed to parse JSON response' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate diet plan' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
