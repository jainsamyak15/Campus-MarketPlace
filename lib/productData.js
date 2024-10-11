// const products = [
//     {
//       id: 1,
//       name: 'Laptop',
//       category: 'Electronics',
//       price: 800,
//       description: 'High-performance laptop for students',
//       image: '/images/laptop.jpg',
//       isForRent: false,
//     },
//     {
//       id: 2,
//       name: 'Textbook',
//       category: 'Stationery',
//       price: 50,
//       description: 'Introduction to Computer Science textbook',
//       image: '/images/textbook.jpg',
//       isForRent: true,
//     },
//     {
//       id: 3,
//       name: 'Bicycle',
//       category: 'Automobiles',
//       price: 200,
//       description: 'Sturdy bicycle for campus commuting',
//       image: '/images/bicycle.jpg',
//       isForRent: true,
//     },
//     // Add more mock products as needed
//   ];
  
//   export function getProductsForSale() {
//     return products.filter(product => !product.isForRent);
//   }
  
//   export function getProductsForRent() {
//     return products.filter(product => product.isForRent);
//   }
  
//   export function addProduct(product) {
//     const newProduct = {
//       ...product,
//       id: products.length + 1,
//     };
//     products.push(newProduct);
//     return newProduct;
//   }


// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'public', 'products.json');

// // Read the products from the JSON file
// export function getProducts() {
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading products.json:', error);
//     return [];
//   }
// }

// // Write the products to the JSON file
// export function saveProducts(products) {
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
//   } catch (error) {
//     console.error('Error writing to products.json:', error);
//   }
// }

// // Get products for rent
// export function getProductsForRent() {
//   const products = getProducts();
//   return products.filter(product => product.forRent); // Assuming you have `forRent` property
// }

// // Get products for sale
// export function getProductsForSale() {
//   const products = getProducts();
//   return products.filter(product => !product.forRent);
// }

// // Add a new product
// export function addProduct(productData) {
//   const products = getProducts();
//   products.push(productData);
//   saveProducts(products);
// }

// lib/productData.js

// lib/productData.js

import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function addProduct(product) {
  try {
    const productToAdd = {
      ...product,
      createdAt: new Date(),
      price: Number(product.price) // Ensure price is stored as a number
    };

    const docRef = await addDoc(collection(db, 'products'), productToAdd);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product: ', error);
    throw error;
  }
}

export async function getProducts(type) {
  try {
    let q;
    if (type === 'sale') {
      q = query(collection(db, 'products'), where('forSale', '==', true));
    } else if (type === 'rent') {
      q = query(collection(db, 'products'), where('forRent', '==', true));
    } else {
      q = collection(db, 'products');
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() // Convert Firestore Timestamp to JavaScript Date
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}

// Add a new function to get a single product by ID
export async function getProductById(id) {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate()
      };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error getting product: ', error);
    throw error;
  }
}