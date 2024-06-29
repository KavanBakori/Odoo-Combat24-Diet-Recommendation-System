const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { Userdetails, connectToDatabase } = require('./dbschemas');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001;

const GEMINI_API_KEY = 'AIzaSyAJ2MQ_7kptOIwiIFr4HN9UpRMBfYzm8W4'; // Set your API key directly here

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateDietPlan = async (userProfile) => {
    const { name, age, gender, height, weight, dietaryPreferences, allergies, healthGoals } = userProfile;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Personalized Diet Plan:
            Customized meal plans based on the following user profile:
            - Name: ${name}
            - Age: ${age}
            - Gender: ${gender}
            - Height: ${height} cm
            - Weight: ${weight} kg
            - Dietary preferences: ${dietaryPreferences}
            - Allergies: ${allergies}
            - Health goals: ${healthGoals}
            
            Provide daily, weekly, and monthly meal suggestions.
            Include calorie, macronutrient (protein, fat, carbs), and micronutrient (vitamins, minerals) breakdown for each plan.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const dietPlan = response.text();
        return dietPlan;
    } catch (error) {
        console.error('Error generating diet plan using Gemini API:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Connect to MongoDB
connectToDatabase();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to save user profile
app.post('/save-profile', async (req, res) => {
    const { email, age, gender, height, weight, dietaryPreferences, allergies, healthGoals } = req.body;

    try {
        let user = await Userdetails.findOne({ email });

        if (!user) {
            user = new Userdetails({
                email,
                age,
                gender,
                height,
                weight,
                dietaryPreferences,
                allergies,
                healthGoals
            });
        } else {
            user.age = age;
            user.gender = gender;
            user.height = height;
            user.weight = weight;
            user.dietaryPreferences = dietaryPreferences;
            user.allergies = allergies;
            user.healthGoals = healthGoals;
        }

        await user.save();
        res.json({ message: 'Profile saved successfully' });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Failed to save profile' });
    }
});

// Route to generate diet plan
app.post('/generate-diet-plan', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Userdetails.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        // Generate diet plan using Gemini API
        const dietPlan = await generateDietPlan({
            name: user.name, // Adjust as per your User schema
            age: user.age,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            dietaryPreferences: user.dietaryPreferences,
            allergies: user.allergies,
            healthGoals: user.healthGoals
        });

        res.json({ dietPlan });
    } catch (error) {
        console.error('Error generating diet plan:', error);
        res.status(500).json({ error: 'Failed to generate diet plan' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
