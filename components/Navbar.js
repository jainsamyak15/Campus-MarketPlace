'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

return (
    <nav className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <span className="text-white font-bold text-xl cursor-pointer">Campus Marketplace</span>
                    </Link>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <NavLink href="/products-for-sale">For Sale</NavLink>
                        <NavLink href="/products-for-rent">For Rent</NavLink>
                        <NavLink href="/add-product">List Item</NavLink>
                        <NavLink href="/cart">Cart</NavLink>
                    </div>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>

        {isOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <MobileNavLink href="/products-for-sale">For Sale</MobileNavLink>
                    <MobileNavLink href="/products-for-rent">For Rent</MobileNavLink>
                    <MobileNavLink href="/add-product">List Item</MobileNavLink>
                    <MobileNavLink href="/cart">Cart</MobileNavLink>
                </div>
            </div>
        )}
    </nav>
)
}

function NavLink({ href, children }) {
    return (
      <Link href={href} passHref>
        <motion.div
          className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a>{children}</a>
        </motion.div>
      </Link>
    )
  }
  
  function MobileNavLink({ href, children }) {
    return (
      <Link href={href} passHref>
        <motion.div
          className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a>{children}</a>
        </motion.div>
      </Link>
    )
  }