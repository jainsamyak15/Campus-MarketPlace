// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'public', 'products.json');

// // Read products from the JSON file
// const getProducts = () => {
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading products.json:', error);
//     return [];
//   }
// };

// // Save products to the JSON file
// const saveProducts = (products) => {
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
//   } catch (error) {
//     console.error('Error writing to products.json:', error);
//   }
// };

// export async function GET() {
//   const products = getProducts();
//   return new Response(JSON.stringify(products), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// export async function POST(request) {
//   const newProduct = await request.json();
  
//   const products = getProducts();
//   products.push(newProduct);
  
//   saveProducts(products);
  
//   return new Response(JSON.stringify(newProduct), {
//     status: 201,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// app/api/products/route.js

import { NextResponse } from 'next/server';
import { addProduct, getProducts } from '../../../lib/productData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  try {
    const products = await getProducts(type);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const product = JSON.parse(formData.get('product'));
    const images = formData.getAll('images');
    
    const id = await addProduct(product, images);
    return NextResponse.json({ id, message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}