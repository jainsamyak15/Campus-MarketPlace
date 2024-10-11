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
import Image from 'next/image';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image 
        src={product.imageUrl || '/placeholder-image.jpg'} 
        alt={product.name} 
        width={300} 
        height={200} 
        layout="responsive"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{product.name}</h2>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <p className="text-gray-900 text-xl font-bold mb-2">${product.price}</p>
        <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
        <button 
          onClick={() => addToCart(product)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;