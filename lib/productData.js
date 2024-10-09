const products = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      price: 800,
      description: 'High-performance laptop for students',
      image: '/images/laptop.jpg',
      isForRent: false,
    },
    {
      id: 2,
      name: 'Textbook',
      category: 'Stationery',
      price: 50,
      description: 'Introduction to Computer Science textbook',
      image: '/images/textbook.jpg',
      isForRent: true,
    },
    {
      id: 3,
      name: 'Bicycle',
      category: 'Automobiles',
      price: 200,
      description: 'Sturdy bicycle for campus commuting',
      image: '/images/bicycle.jpg',
      isForRent: true,
    },
    // Add more mock products as needed
  ];
  
  export function getProductsForSale() {
    return products.filter(product => !product.isForRent);
  }
  
  export function getProductsForRent() {
    return products.filter(product => product.isForRent);
  }
  
  export function addProduct(product) {
    const newProduct = {
      ...product,
      id: products.length + 1,
    };
    products.push(newProduct);
    return newProduct;
  }