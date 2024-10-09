"use client";
import { motion } from 'framer-motion';

const categories = ['All', 'Electronics', 'Stationery', 'Automobiles', 'Household'];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => onCategoryChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}