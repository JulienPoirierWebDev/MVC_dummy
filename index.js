import express from "express";

const PORT = 3000;

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

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

app.get("/produits", function (request, response) {
  response.render("products", { products: products });
});

app.get("/produits/:id", function (request, response) {
  // récupérer id
  let id = Number(request.params.id);

  /*
  let searchProduct;

  for (const product of products) {
    if (product.id === id) {
      searchProduct = product;
    }
  }
  */

  const searchProduct = products.filter((product) => {
    return product.id === id;
  })[0];

  console.log(searchProduct);

  if (searchProduct) {
    response.render("products-fiche", { product: searchProduct });
  } else {
    response.send("404 - produit non trouvé");
  }
});

app.post("/produits", (request, response) => {
  console.log("post request produit");
  const newProduct = request.body;
  console.log(newProduct);
  let error = false;
  const productTypes = {
    id: "number",
    price: "number",
    name: "string",
  };

  function testID() {
    if (newProduct.id && typeof newProduct.id === productTypes.id) {
      return true;
    }
    return false;
  }

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

  if (testID() && testName() && testPrice()) {
    products.push(newProduct);
  } else {
    error = true;
  }

  if (error) {
    response.send({ message: "Il y a une erreur avec la donnée" });
  }
  response.redirect("/produits");
});

app.use((req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
