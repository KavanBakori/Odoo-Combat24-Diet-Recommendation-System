const HeroSection = () => {
    return (
      <div className="bg-[#FFF8E9] min-h-screen font-sans relative overflow-hidden">
        {/* Navigation */}
        {/* ... (keep the navigation code as is) ... */}
  
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Diet <br/>
            Recommendation System<br />
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
            addressing personalized nutrition and health goals
            </p>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-600 transition duration-300">
              Create Now!
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/images/image1.svg"
              alt="Diet plan illustration" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
  
        {/* Purple curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#A855F7" fillOpacity="1" d="M0,288L1440,192L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    );
  };
  
  export default HeroSection;