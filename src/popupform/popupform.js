import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


const Popupform = () => {
  const navigate=useNavigate();
  const { user } = useAuth0();
  const [form, setForm] = useState({});


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    form.email = user?.email;
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/popupdata', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Your details has been sent successfully');
      } else {
        alert('Failed to send suggestion');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      console.log('An error occurred while submitting your suggestion');
    }
    navigate('/')
  };

  const inputClasses = "peer w-full h-12 px-4 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 transition-all duration-300 ease-in-out";
  const labelClasses = "absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm";
  const textareaClasses = "peer w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 resize-none transition-all duration-300 ease-in-out";

  return (
    <>
      {/* <br /><br /><br /> */}
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Health Profile</h2>
        <h3>Name: {user?.name}</h3><span>Email: {user?.email}</span>
        <br /><br />
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <input
                type="number"
                id="age"
                name="age"
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
              name="dietarypreferences"
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
              name="healthgoals"
              onChange={handleChange}
              rows="3"
              className={`${textareaClasses} group-hover:border-indigo-400`}
              placeholder="Health Goals"
            ></textarea>
            <label htmlFor="healthGoals" className={labelClasses}>Health Goals</label>
          </div>
          <div className="flex justify-between">
            <button
            onClick={handleSubmit}
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Save
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Show my Diet plan
            </button>
          </div>
        </form>
      </div>
      {/* <br /><br /><br /> */}
    </>
  )
}

export default Popupform;





