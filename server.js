const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit) || undefined;
  const products = getProducts(limit);
  res.json(products);
});

// Ruta para obtener un producto por ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Función para obtener los productos con límite opcional
function getProducts(limit) {
  const rawData = fs.readFileSync('products.json', 'utf-8');
  const products = JSON.parse(rawData);
  if (limit) {
    return products.slice(0, limit);
  }
  return products;
}

// Función para obtener un producto por ID
function getProductById(id) {
  const rawData = fs.readFileSync('products.json', 'utf-8');
  const products = JSON.parse(rawData);
  const product = products.find((p) => p.id === id);
  return product;
}

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});