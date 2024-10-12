import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AddToCartModal = ({ product, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      // Automatically close the modal after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      // Cleanup the timer when the component unmounts or when isVisible changes
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-2">Added to Cart!</h2>
        <p className="text-gray-600">{product.name} has been added to your cart.</p>
      </motion.div>
    </div>
  );
};

export default AddToCartModal;
