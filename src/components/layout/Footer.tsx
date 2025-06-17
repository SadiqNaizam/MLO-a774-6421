import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');

  const footerLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodDeliveryApp. All rights reserved.</p>
          <p className="mt-1">Crafted with care for your culinary convenience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;