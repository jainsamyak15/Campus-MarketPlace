// "use client";
// import { useState, useEffect } from 'react';
// // import Layout from '../../components/Layout';
// import ProductCard from '../../components/ProductCard';
// import CategoryFilter from '../../components/CategoryFilter';
// import { motion } from 'framer-motion';
// import { getProductsForRent } from '../../lib/productData';

// export default function ProductsForRent() {
//   const [products, setProducts] = useState([]);
//   const [initialProducts, setInitialProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   useEffect(() => {
//     async function fetchProducts() {
//       const products = await getProductsForRent();
//       setProducts(products);
//       setInitialProducts(products);
//     }
//     fetchProducts();
//   }, []);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     if (category === 'All') {
//       setProducts(initialProducts);
//     } else {
//       setProducts(initialProducts.filter(product => product.category === category));
//     }
//   };

//   return (
//     // <Layout>
//       <div className="container mx-auto px-4 py-8">
//         <motion.h1 
//           className="text-3xl font-bold text-center mb-8"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Products for Rent
//         </motion.h1>
//         <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
//           {products.map((product) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ProductCard product={product} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     // </Layout>
//   );
// }
// app/products-for-rent/page.js

"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { getProducts } from '../../lib/productData';

export default function ProductsForRent() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts('rent');
        // Additional check to ensure only products with forRent = true are included
        const forRentProducts = allProducts.filter(product => product.forRent === true);
        setProducts(forRentProducts);
        setFilteredProducts(forRentProducts);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(forRentProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Products for Rent
      </motion.h1>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProductCard product={product} addToCart={addToCart} isRental={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}