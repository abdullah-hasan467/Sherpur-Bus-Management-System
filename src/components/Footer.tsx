import React from 'react';
import { Bus, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Bus size={24} />
              <h3 className="text-xl font-bold">Sherpur Bus</h3>
            </div>
            <p className="mt-4 text-gray-300">
              Providing reliable transportation services between Sherpur, Dhaka, and beyond.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@sherpurbus.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">Schedule</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Book Tickets</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">About Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Sherpur Bus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};