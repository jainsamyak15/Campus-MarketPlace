"use client";
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo or Site Name */}
          <motion.div
            className="text-lg font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Campus Marketplace
          </motion.div>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              href="https://facebook.com"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-white"
            >
              <FaFacebookF size={25} className="text-gray-300 hover:text-white" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-white"
            >
              <FaTwitter size={25} className="text-gray-300 hover:text-white" />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-white"
            >
              <FaInstagram size={25} className="text-gray-300 hover:text-white" />
            </motion.a>
          </div>

          {/* Customer Service */}
          <div className="mt-4 md:mt-0 flex space-x-4 items-center">
          <FaPhoneAlt size={25} className="text-gray-300 hover:text-white" />
            <motion.p
              className="text-gray-300 hover:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Customer Service: <a href="tel:+1234567890" className="font-medium text-white">+1 (234) 567-890</a>
            </motion.p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="text-sm">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              © {new Date().getFullYear()} Campus Marketplace. All rights reserved.
            </motion.p>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-white"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-white"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-white"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
