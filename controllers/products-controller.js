import * as productsModel from "../models/products-model.js";

function allProducts(request, response) {
  const products = productsModel.getAllProducts();
  response.render("products", { products: products });
}

function oneProduct(request, response) {
  let id = Number(request.params.id);

  const searchProduct = productsModel.getOneProduct(id);

  if (searchProduct) {
    response.render("products-fiche", { product: searchProduct });
  } else {
    response.send("404 - produit non trouvé");
  }
}

function createProduct(request, response) {
  const newProduct = request.body;
  newProduct.price = Number(newProduct.price);

  let error = false;
  const productTypes = {
    id: "number",
    price: "number",
    name: "string",
  };

  function testName() {
    if (newProduct.name && typeof newProduct.name === productTypes.name) {
      return true;
    }
    return false;
  }

  function testPrice() {
    if (newProduct.price && typeof newProduct.price === productTypes.price) {
      return true;
    }
    return false;
  }

  if (testName() && testPrice()) {
    try {
      productsModel.createProduct(newProduct);
      const products = productsModel.getAllProducts();

      response.render("products-created", { newProduct, products });
    } catch (error) {
      console.log("error", error);
    }
  } else {
    error = true;
  }

  if (error) {
    response.send({ message: "il y a une erreur" });
  }
}

function formProductAdd(request, response) {
  response.render("form-products-add");
}

function formProductDelete(request, response) {
  const products = productsModel.getAllProducts();
  response.render("form-products-delete", { products });
}

function deleteProduct(request, response) {
  const id = Number(request.query.id);
  console.log("id", id);

  const products = productsModel.deleteOne(id);

  response.render("products", { products });
}

export {
  allProducts,
  oneProduct,
  createProduct,
  formProductAdd,
  formProductDelete,
  deleteProduct,
};
