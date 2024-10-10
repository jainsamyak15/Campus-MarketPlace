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
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductCard({ product, addToCart, isRental = false }) {
  const handleAddToCart = () => {
    addToCart({ ...product, isRental });
  };

  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48">
        <Image 
          src={product.image || '/placeholder.png'} 
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-blue-600 font-bold">
          {isRental ? `$${product.price}/day` : `$${product.price}`}
        </p>
        <motion.button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
        >
          {isRental ? 'Rent Now' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}