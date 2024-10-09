"use client";
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            © {new Date().getFullYear()} Campus Marketplace. All rights reserved.
          </motion.div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a href="#" className="text-gray-300 hover:text-white">
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}