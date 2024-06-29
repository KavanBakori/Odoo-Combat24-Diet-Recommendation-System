// Profile.js

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NavBar from '../Navbar/navbar';

const Profile = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        dietaryPreferences: '',
        allergies: '',
        healthGoals: '',
    });
    const [dietPlan, setDietPlan] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/save-profile', {
                email: user.email,
                ...formData
            });
            console.log('Profile Saved:', response.data);
            // Optionally show a success message or update UI
        } catch (error) {
            console.error('Error saving profile:', error);
            // Handle error state or display an error message
        }
    };

    const handleShowDietPlan = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/generate-diet-plan', {
                email: user.email
            });
            console.log('Diet Plan Response:', response.data);
            setDietPlan(response.data.dietPlan);
        } catch (error) {
            console.error('Error generating diet plan:', error);
            // Handle error state or display an error message
        }
    };

    const inputClasses = "peer w-full h-12 px-4 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 transition-all duration-300 ease-in-out";
    const labelClasses = "absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm";
    const textareaClasses = "peer w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 resize-none transition-all duration-300 ease-in-out";

    return (
        <>
            <NavBar />
            <br /><br /><br />
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Health Profile</h2>
                <h3>Name: {user?.name}</h3>
                <span>Email: {user?.email}</span>
                <br /><br />
                <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className={`${inputClasses} group-hover:border-indigo-400`}
                                placeholder="Age"
                            />
                            <label htmlFor="age" className={labelClasses}>Age</label>
                        </div>
                        <div className="relative group">
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`${inputClasses} group-hover:border-indigo-400`}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor="gender" className={labelClasses}>Gender</label>
                        </div>
                        <div className="relative group">
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className={`${inputClasses} group-hover:border-indigo-400`}
                                placeholder="Weight (kg)"
                            />
                            <label htmlFor="weight" className={labelClasses}>Weight (kg)</label>
                        </div>
                        <div className="relative group">
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className={`${inputClasses} group-hover:border-indigo-400`}
                                placeholder="Height (cm)"
                            />
                            <label htmlFor="height" className={labelClasses}>Height (cm)</label>
                        </div>
                    </div>
                    <div className="relative group">
                        <textarea
                            id="dietaryPreferences"
                            name="dietaryPreferences"
                            value={formData.dietaryPreferences}
                            onChange={handleChange}
                            rows="3"
                            className={`${textareaClasses} group-hover:border-indigo-400`}
                            placeholder="Dietary Preferences"
                        ></textarea>
                        <label htmlFor="dietaryPreferences" className={labelClasses}>Dietary Preferences</label>
                    </div>
                    <div className="relative group">
                        <textarea
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            rows="3"
                            className={`${textareaClasses} group-hover:border-indigo-400`}
                            placeholder="Allergies"
                        ></textarea>
                        <label htmlFor="allergies" className={labelClasses}>Allergies</label>
                    </div>
                    <div className="relative group">
                        <textarea
                            id="healthGoals"
                            name="healthGoals"
                            value={formData.healthGoals}
                            onChange={handleChange}
                            rows="3"
                            className={`${textareaClasses} group-hover:border-indigo-400`}
                            placeholder="Health Goals"
                        ></textarea>
                        <label htmlFor="healthGoals" className={labelClasses}>Health Goals</label>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleShowDietPlan}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Show my Diet plan
                        </button>
                    </div>
                </form>
                {dietPlan && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Your Diet Plan</h3>
                        <pre>{JSON.stringify(dietPlan, null, 2)}</pre>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
