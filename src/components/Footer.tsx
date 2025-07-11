
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    // Main footer container with the new light background and dark bottom border
   <footer className="bg-purple-300 text-purple-200 py-10 px-4 md:px-8 border-b-[15px] border-purple-200">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
        {/* Column 1: Shiwama Drive Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 uppercase text-footerHeadingDark">Shiwama Drive</h3>
          <p className="flex items-center gap-2 mb-2 text-footerLinkRed">
            <FaPhone className="text-footerHeadingDark" />
            0740798648
          </p>
          <p className="flex items-center gap-2 text-footerLinkRed">
            <FaEnvelope className="text-footerHeadingDark" />
            sdrive@gmail.com
          </p>
        </div>

        {/* Column 2: Hours */}
        <div>
          <h3 className="text-xl font-bold mb-4 uppercase text-footerHeadingDark">Hours</h3>
          <p className="mb-2 text-footerLinkRed">Monday - Sunday</p>
          <p className="text-footerLinkRed">24/7</p>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 uppercase text-footerHeadingDark">Quick Links</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline text-footerLinkRed">Contact</a></li>
            <li className="mb-2"><a href="#" className="hover:underline text-footerLinkRed">Register</a></li>
            <li className="mb-2"><a href="#" className="hover:underline text-footerLinkRed">Login</a></li>
          </ul>
        </div>

        {/* Column 4: Follow Us / Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4 uppercase text-footerHeadingDark">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-3xl text-footerHeadingDark hover:text-gray-600"><FaFacebookF /></a>
            <a href="#" className="text-3xl text-footerHeadingDark hover:text-gray-600"><FaInstagram /></a>
            <a href="#" className="text-3xl text-footerHeadingDark hover:text-gray-600"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-footerLinkRed mt-6 pt-4">
        <p>© 2025 SHIWAMA DRIVE. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;