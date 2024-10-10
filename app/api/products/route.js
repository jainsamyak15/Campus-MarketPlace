import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'products.json');

// Read products from the JSON file
const getProducts = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products.json:', error);
    return [];
  }
};

// Save products to the JSON file
const saveProducts = (products) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing to products.json:', error);
  }
};

export async function GET() {
  const products = getProducts();
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const newProduct = await request.json();
  
  const products = getProducts();
  products.push(newProduct);
  
  saveProducts(products);
  
  return new Response(JSON.stringify(newProduct), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
