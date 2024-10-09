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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl text-center text-gray-600 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Buy, sell, or rent items from fellow students
      </motion.p>
      <div className="flex space-x-4">
        <Link href="/products-for-sale" passHref>
          <motion.a
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as="a"
          >
            Shop Now
          </motion.a>
        </Link>
        <Link href="/add-product" passHref>
          <motion.a
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as="a"
          >
            List an Item
          </motion.a>
        </Link>
      </div>
    </div>
  )
}