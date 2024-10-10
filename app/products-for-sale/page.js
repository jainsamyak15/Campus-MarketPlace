// "use client";
// import { useState, useEffect } from 'react';
// // import Layout from '../../components/Layout';
// import ProductCard from '../../components/ProductCard';
// import CategoryFilter from '../../components/CategoryFilter';
// import { motion } from 'framer-motion';
// import { getProductsForSale } from '../../lib/productData';

// export default function ProductsForSale() {
//   const [products, setProducts] = useState([]);
//   const [initialProducts, setInitialProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   useEffect(() => {
//     async function fetchProducts() {
//       const products = await getProductsForSale();
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
//           Products for Sale
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
// app/products-for-sale/page.js

"use client"; // Make sure this is a client component

import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import { motion } from 'framer-motion';
import { CartProvider, useCart } from '../../context/CartContext';

export default function ProductsForSale() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  // Fetch data from the public products.json file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const productsForSale = data.filter(product => product.forSale === true);
        setProducts(productsForSale);
        setFilteredProducts(productsForSale);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle category change and filter products
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Products for Sale
      </motion.h1>
      
      {/* Category filter component */}
      <CategoryFilter onChange={handleCategoryChange} />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
