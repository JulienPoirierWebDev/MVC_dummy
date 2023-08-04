let products = [
  {
    id: 1,
    name: "Pantalon Diesel",
    price: 200,
  },
  {
    id: 2,
    name: "Chemise Diesel",
    price: 100,
  },
  {
    id: 3,
    name: "Chaussures Diesel",
    price: 500,
  },
];

function getAllProducts() {
  return products;
}

function getOneProduct(id) {
  const searchProduct = products.filter((product) => {
    return product.id === id;
  })[0];

  return searchProduct;
}

function createProduct(newProduct) {
  newProduct.id = products.length + 1;
  products.push(newProduct);
  return products;
}

function deleteOne(id) {
  console.log(products);
  const newProducts = products.filter((product) => product.id !== id);

  console.log(newProducts);
  products = newProducts;
  return products;
}

export { getAllProducts, getOneProduct, createProduct, deleteOne };
