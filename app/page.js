'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  const [text, setText] = useState('')
  const fullText = "R ent or Sell: Your Campus Marketplace"

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(i))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.h1 
        className="text-4xl md:text-7xl font-extrabold text-center text-white mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {text}
      </motion.h1>
      <motion.p 
        className="text-lg md:text-2xl text-center text-white mb-12 max-w-2xl leading-relaxed drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        Buy, sell, or rent items from fellow students and make the most out of your campus life. Fast, secure, and convenient.
      </motion.p>
      <div className="flex space-x-6 mt-6">
        <Link href="/products-for-sale" passHref>
          <motion.a
            className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.9 }}
          >
            Shop Now
          </motion.a>
        </Link>
        <Link href="/add-product" passHref>
          <motion.a
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            List an Item
          </motion.a>
        </Link>
      </div>
      <motion.div
        className="absolute bottom-10 text-white text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
      >
        Connecting students, empowering transactions. Welcome to your campus marketplace.
      </motion.div>
    </div>
  )
}
