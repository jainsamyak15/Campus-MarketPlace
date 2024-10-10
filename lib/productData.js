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
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'products.json');

// Read the products from the JSON file
export function getProducts() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products.json:', error);
    return [];
  }
}

// Write the products to the JSON file
export function saveProducts(products) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing to products.json:', error);
  }
}

// Get products for rent
export function getProductsForRent() {
  const products = getProducts();
  return products.filter(product => product.forRent); // Assuming you have `forRent` property
}

// Get products for sale
export function getProductsForSale() {
  const products = getProducts();
  return products.filter(product => !product.forRent);
}

// Add a new product
export function addProduct(productData) {
  const products = getProducts();
  products.push(productData);
  saveProducts(products);
}
