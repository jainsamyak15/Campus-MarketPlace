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
// components/AddProductForm.js

import React, { useState } from 'react';

const AddProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    forSale: false,
    forRent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <input
            type="checkbox"
            id="forSale"
            name="forSale"
            checked={product.forSale}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label htmlFor="forSale" className="ml-2 text-sm font-medium text-gray-700">For Sale</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="forRent"
            name="forRent"
            checked={product.forRent}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label htmlFor="forRent" className="ml-2 text-sm font-medium text-gray-700">For Rent</label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;