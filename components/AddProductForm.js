// "use client";
// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function AddProductForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     isForRent: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
//         <select
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">Select a category</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Stationery">Stationery</option>
//           <option value="Automobiles">Automobiles</option>
//           <option value="Household">Household</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//           min="0"
//           step="0.01"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
//           required
//         ></textarea>
//       </div>
//       <div className="mb-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="isForRent"
//             checked={formData.isForRent}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <span className="text-gray-700 font-bold">Available for Rent</span>
//         </label>
//       </div>
//       <motion.button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Add Product
//       </motion.button>
//     </motion.form>
//   );
// }
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    isForRent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price), // Ensure price is a number
      category: formData.category,
      description: formData.description,
      forSale: !formData.isForRent, // if not for rent, it's for sale
      forRent: formData.isForRent,   // Assign forRent based on the checkbox
    };

    try {
      // Send POST request to the API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      alert('Product added successfully');
      // Reset form
      setFormData({ name: '', category: '', price: '', description: '', isForRent: false });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Fields */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Automobiles">Automobiles</option>
          <option value="Household">Household</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isForRent"
            checked={formData.isForRent}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700 font-bold">Available for Rent</span>
        </label>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Product
      </motion.button>
    </motion.form>
  );
}
