// dbschemas.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for user details
const userdetailsSchema = new Schema({
    email: { type: String },
    age: { type: String },
    gender: { type: String },
    weight: { type: String },
    height: { type: String },
    dietaryPreferences: { type: String },
    allergies: { type: String },
    healthGoals: { type: String }
});

// Export model based on schema
const Userdetails = mongoose.model('Userdetails', userdetailsSchema);

// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://adityajethwa60:DJUAFrnUgyLqPc7f@cluster0.ermngbx.mongodb.net/yourdatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // This line might not be necessary in newer versions
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Exit process on connection failure
        process.exit(1);
    }
};

module.exports = {
    Userdetails,
    connectToDatabase
};
