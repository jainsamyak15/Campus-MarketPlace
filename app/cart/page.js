// "use client";
// import { useState, useEffect } from 'react';
// // import Layout from '../../components/Layout';
// import CartItem from '../../components/CartItem';
// import { motion } from 'framer-motion';

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     // In a real application, you'd fetch this from an API or local storage
//     const mockCartItems = [
//       { id: 1, name: 'Laptop', price: 800, quantity: 1 },
//       { id: 2, name: 'Textbook', price: 50, quantity: 2 },
//     ];
//     setCartItems(mockCartItems);
//   }, []);

//   useEffect(() => {
//     const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotal(newTotal);
//   }, [cartItems]);

//   const handleQuantityChange = (id, newQuantity) => {
//     setCartItems(cartItems.map(item => 
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const handleRemoveItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
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
//           Your Cart
//         </motion.h1>
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-600">Your cart is empty.</p>
//         ) : (
//           <>
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <CartItem 
//                   key={item.id} 
//                   item={item} 
//                   onQuantityChange={handleQuantityChange}
//                   onRemove={handleRemoveItem}
//                 />
//               ))}
//             </div>
//             <div className="mt-8 text-right">
//               <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
//               <motion.button
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Proceed to Checkout
//               </motion.button>
//             </div>
//           </>
//         )}
//       </div>
//     // </Layout>
//   );
// }
"use client";
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto p-8">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Cart
      </motion.h1>
      
      {cart.length === 0 ? (
        <motion.p 
          className="text-center text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <>
          {/* Cart Items */}
          <motion.div
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </motion.div>

          {/* Total Price Section */}
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-2xl font-semibold">Total:</p>
            <p className="text-3xl font-bold">${calculateTotal().toFixed(2)}</p>
          </motion.div>

          {/* Checkout Button */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              Proceed to Checkout
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
