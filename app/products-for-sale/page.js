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

// "use client";

// import React, { useEffect, useState } from 'react';
// import ProductCard from '../../components/ProductCard';
// import CategoryFilter from '../../components/CategoryFilter';
// import { motion } from 'framer-motion';
// import { useCart } from '../../context/CartContext';

// export default function ProductsForSale() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [categories, setCategories] = useState(['All']);
//   const { addToCart } = useCart();

//   // Fetch data from the public products.json file
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('/products.json');
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         const data = await response.json();
//         const productsForSale = data.filter(product => product.forSale === true);
//         setProducts(productsForSale);
//         setFilteredProducts(productsForSale);

//         // Extract unique categories
//         const uniqueCategories = ['All', ...new Set(productsForSale.map(product => product.category))];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle category change and filter products
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     if (category === 'All') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(product => product.category === category);
//       setFilteredProducts(filtered);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.h1 
//         className="text-3xl font-bold text-center mb-8"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Products for Sale
//       </motion.h1>
      
//       {/* Category filter component */}
//       <CategoryFilter 
//         categories={categories}
//         selectedCategory={selectedCategory}
//         onCategoryChange={handleCategoryChange}
//       />

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProducts.map((product, index) => (
//           <motion.div 
//             key={product.id || index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <ProductCard product={product} addToCart={addToCart} />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { getProducts } from '../../lib/productData';

export default function ProductsForSale() {
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
        const allProducts = await getProducts('sale');
        const forSaleProducts = allProducts.filter(product => product.forSale === true);
        setProducts(forSaleProducts);
        setFilteredProducts(forSaleProducts);

        const uniqueCategories = ['All', ...new Set(forSaleProducts.map(product => product.category))];
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
    return <div className="text-center py-10 text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Products for Sale
      </motion.h1>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id}
            className="transform transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProductCard product={product} addToCart={addToCart} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <motion.button 
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Products
        </motion.button>
      </div>
    </div>
  );
}
