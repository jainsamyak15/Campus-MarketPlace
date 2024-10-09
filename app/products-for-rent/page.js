"use client";
import { useState, useEffect } from 'react';
// import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import { motion } from 'framer-motion';
import { getProductsForRent } from '../../lib/productData';

export default function ProductsForRent() {
  const [products, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProductsForRent();
      setProducts(products);
      setInitialProducts(products);
    }
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setProducts(initialProducts);
    } else {
      setProducts(initialProducts.filter(product => product.category === category));
    }
  };

  return (
    // <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Products for Rent
        </motion.h1>
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    // </Layout>
  );
}