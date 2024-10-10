import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'Campus Marketplace',
  description: 'Buy, sell, or rent items from fellow students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  )
}