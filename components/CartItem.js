// "use client";
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// export default function CartItem({ item, onQuantityChange, onRemove }) {
//   return (
//     <motion.div 
//       className="flex items-center justify-between border-b border-gray-200 py-4"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="flex items-center">
//         <div className="w-20 h-20 relative mr-4">
//           <Image 
//             src={item.image || '/placeholder.png'} 
//             alt={item.name}
//             layout="fill"
//             objectFit="cover"
//             className="rounded"
//           />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold">{item.name}</h3>
//           <p className="text-gray-600">${item.price.toFixed(2)}</p>
//         </div>
//       </div>
//       <div className="flex items-center">
//         <div className="mr-4">
//           <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
//           <select
//             id={`quantity-${item.id}`}
//             value={item.quantity}
//             onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
//             className="border rounded px-2 py-1"
//           >
//             {[1, 2, 3, 4, 5].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//         <motion.button
//           onClick={() => onRemove(item.id)}
//           className="text-red-500 hover:text-red-700"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           Remove
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CartItem({ item, removeFromCart, updateQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-between border-b py-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      whileHover={{ scale: 1.02 }}
    >
      {/* Item details */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
        <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center space-x-4">
        <button
          className="px-3 py-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold rounded-lg shadow-md"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          -
        </button>
        <input
          type="number"
          className="w-12 text-center bg-gray-50 border border-gray-300 rounded-lg py-1 shadow-inner"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
        />
        <button
          className="px-3 py-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold rounded-lg shadow-md"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Remove button */}
      <button
        className="ml-6 px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-500 transition-all ease-in-out"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </motion.div>
  );
}
