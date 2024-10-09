"use client";
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import CartItem from '../../components/CartItem';
import { motion } from 'framer-motion';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // In a real application, you'd fetch this from an API or local storage
    const mockCartItems = [
      { id: 1, name: 'Laptop', price: 800, quantity: 1 },
      { id: 2, name: 'Textbook', price: 50, quantity: 2 },
    ];
    setCartItems(mockCartItems);
  }, []);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
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
          Your Cart
        </motion.h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            <div className="mt-8 text-right">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <motion.button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}