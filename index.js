import express from "express";
import * as productsController from "./controllers/products-controller.js";

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.post("/produits/delete", productsController.deleteProduct);

app.get("/produits/ajouter-un-produit", productsController.formProductAdd);

app.get("/produits/supprimer-un-produit", productsController.formProductDelete);

app.get("/produits/:id", productsController.oneProduct);

app.get("/produits", productsController.allProducts);

app.post("/produits", productsController.createProduct);

app.use((req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
