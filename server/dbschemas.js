const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userdetailsSchema = new Schema({
    email: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
    weight: {
        type: String,
    },
    height: {
        type: String,
    },
    dietarypreferences: {
        type: String,
    },
    allergies: {
        type: String,
    },
    healthgoals: {
        type: String,
    }
})


module.exports = {
    Userdetails: mongoose.model('Userdetails', userdetailsSchema),
    
    connectToDatabase: async () => {
        try {
            await mongoose.connect('mongodb+srv://adityajethwa60:DJUAFrnUgyLqPc7f@cluster0.ermngbx.mongodb.net/', {

            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    },
};