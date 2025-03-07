import { Bus, Mail, Phone } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Bus size={24} />
              <h3 className="text-4xl font-bold">Sherpur Bus</h3>
            </div>
            <p className=" text-justify text-ali mt-4 text-gray-300">
              Sherpur Bus Management System provides updated schedules for
              outgoing and incoming buses from Sherpur to destinations across
              the country. Information is collected from{" "}
              <span className="text-red-300">
                Buses of Mymensingh Division (BMD){" "}
              </span>{" "}
              and may change as per authority updates.
            </p>
          </div>

          <div className="ml-20">
            <h3 className="text-4xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+880 01521-514957</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>m.hasan3444@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-semibold mb-4">Created by</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://abdullah-hasan467.github.io/-My-portfolio/" target="_blank" className="hover:text-blue-400">
                  Md. Abdullah Al Hasan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  
                  className="hover:text-blue-400"
                >
                  Updated Date: 7th March, 2025
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Sherpur Bus Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
