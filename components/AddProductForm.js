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

const AddProductForm = ({ onSubmit, onImageUpload }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    forSale: false,
    forRent: false
  });
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]); // State for image URLs
  const [productId, setProductId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleImageUrlChange = (e) => {
    setImageUrls(e.target.value.split(',').map(url => url.trim())); // Split by comma for multiple URLs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProductId = await onSubmit(product);
    setProductId(newProductId);

    // Check if there are valid image URLs
    if (imageUrls.length > 0) {
      // Upload URLs directly without the Upload button
      for (let url of imageUrls) {
        await onImageUpload(newProductId, url);
      }
    } else if (images.length > 0) {
      // Handle image uploads if there are files
      for (let image of images) {
        const formData = new FormData();
        formData.append('file', image);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { fileUrl } = await response.json();
          await onImageUpload(newProductId, fileUrl);
        } else {
          console.error('Failed to upload image');
        }
      }
    }

    // Reset the form fields
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      forSale: false,
      forRent: false
    });
    setImages([]);
    setImageUrls([]);
    setProductId(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-purple-300">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg w-full bg-white p-9 shadow-lg rounded-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900"></h2>
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-800">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 p-3 text-lg"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-800">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 p-3 text-lg"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-800">Price(In Dollars)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 p-3 text-lg"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-800">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 p-3 text-lg"
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="HouseHold">HouseHold</option>
            <option value="Automobiles">Automobiles</option>
            <option value="Stationery">Stationery</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="forSale"
              name="forSale"
              checked={product.forSale}
              onChange={handleChange}
              className="custom-checkbox rounded border-gray-300 text-purple-500 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200"
            />
            <label htmlFor="forSale" className="ml-3 text-md font-medium text-gray-800">For Sale</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="forRent"
              name="forRent"
              checked={product.forRent}
              onChange={handleChange}
              className="custom-checkbox rounded border-gray-300 text-purple-500 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200"
            />
            <label htmlFor="forRent" className="ml-3 text-md font-medium text-gray-800">For Rent</label>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="images" className="block text-lg font-medium text-gray-800">Product Images</label>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="mt-2 block w-full text-gray-900 bg-white rounded-lg border-gray-300 cursor-pointer shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200"
          />
          <p className="text-gray-600 text-sm mt-2">Or provide image URLs separated by commas</p>
          <input
            type="text"
            onChange={handleImageUrlChange}
            placeholder="Enter image URLs"
            className="mt-2 block w-full text-gray-900 bg-white rounded-lg border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 p-3 text-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
