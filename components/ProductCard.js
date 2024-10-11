// "use client";
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// export default function ProductCard({ product, isRental = false }) {
//   return (
//     <motion.div 
//       className="bg-white shadow-md rounded-lg overflow-hidden"
//       whileHover={{ scale: 1.05 }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="relative h-48">
//         <Image 
//           src={product.image || '/placeholder.png'} 
//           alt={product.name}
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//         <p className="text-gray-600 mb-2">{product.category}</p>
//         <p className="text-blue-600 font-bold">
//           {isRental 
//             ? `$${product.price}/day` 
//             : `$${product.price}`
//           }
//         </p>
//         <motion.button
//           className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           {isRental ? 'Rent Now' : 'Add to Cart'}
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }
// components/ProductCard.js

import React from 'react';
import ImageCarousel from './ImageCarousel';
import { motion } from 'framer-motion';

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={product.imageUrls} />
        <span className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col items-center">
        {/* Product Name */}
        <h2 className="font-bold text-2xl text-gray-900 text-center mb-2">
          {product.name}
        </h2>

        {/* Product Description */}
        <p className="text-gray-600 text-base mb-4 text-center line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-2xl font-extrabold text-blue-500 mb-4">
          ${product.price}
        </p>

        {/* Add to Cart Button */}
        <motion.button
          onClick={() => addToCart(product)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
