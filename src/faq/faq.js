import { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the Diet Recommendation System?',
      answer: 'The Diet Recommendation System is a platform that provides personalized diet plans based on user profiles and dietary preferences.',
    },
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button on the homepage and fill out the registration form with your details.',
    },
    {
      question: 'Can I update my dietary preferences?',
      answer: 'Yes, you can update your dietary preferences anytime by going to your profile settings.',
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 bg-customBg">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left flex justify-between items-center text-lg font-medium text-purple-700"
          >
            {faq.question}
            <span className="text-purple-700">
              {openIndex === index ? '-' : '+'}
            </span>
          </button>
          {openIndex === index && (
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
