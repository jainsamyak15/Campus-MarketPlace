"use client";
import { useState } from 'react';
import Layout from '../../components/Layout';
import AddProductForm from '../../components/AddProductForm';
import { motion } from 'framer-motion';

export default function AddProduct() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (productData) => {
    // In a real application, you'd send this data to your backend
    console.log('Submitted product:', productData);
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Add a New Product
        </motion.h1>
        {isSubmitted ? (
          <motion.div
            className="text-center text-green-600 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Product submitted successfully!
          </motion.div>
        ) : (
          <AddProductForm onSubmit={handleSubmit} />
        )}
      </div>
    </Layout>
  );
}