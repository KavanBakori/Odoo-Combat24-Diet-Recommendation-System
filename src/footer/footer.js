const Footer = () => {
    return (
      <footer className="text-purple-600 pt-12 pb-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              © 2024 Hitahara Diet Recommendation System. All rights reserved.Odoo Combat Hackathon2024.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-800">Privacy Policy</a>
              <a href="#" className="hover:text-purple-800">Terms of Service</a>
              <a href="#" className="hover:text-purple-800">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;