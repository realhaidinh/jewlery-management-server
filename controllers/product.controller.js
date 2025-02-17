const db = require('../models')

const Product = db.Product

const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  // console.log(products);
  if (products) {
    if (products.length <= 0) res.status(200).send("No product found");
    else {
      res.status(200).send(products);
    }
  }
}

const createProduct = async (req, res) => {
  const { name, price, stock, ProductTypeId } = req.body;
  let result;
  if (!name || !price) { res.status(400).send("Please provide name and price, stock will be automatically set to 0.") }
  try {
    result = await db.ProductType.findByPk(ProductTypeId);
    if (!result) {
      res.status(200).send("Product type couldn't be found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong while finding provided product type");
  }
  result = await Product.create({
    name, price, stock, ProductTypeId
  });
  if (result) {
    console.log("new product created");
    res.status(200).send(result);
  }
  else {
    res.status(500).send("Something went wrong")
  }
}

const getWithId = async (req, res) => {
  const toFindId = req.params.id;
  try {
    const result = await ProductTypes.findByPk(toFindId);
    if (result) {
      console.log(`Product with id ${toFindId} found.`);
      res.status(200).send(result);
    }
    else {
      res.status(200).send("Product type couldn't be found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong")
  }
}

const updateProduct = async (req, res) => {
  const { name, price, stock, ProductTypeId } = req.body;
  const updateId = req.params.id;
  let product = await Product.findByPk(updateId);
  if (product) {
    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.stock = stock ? stock : product.stock;
    product.ProductTypeId = ProductTypeId ? ProductTypeId : product.ProductTypeId;
    await product.save();
    console.log(`Product ${updateId} updated succesfully.`);
    res.status(200).send(product);
  }
  else {
    res.status(400).send("Product not found.");
  }
}

module.exports = { getAllProducts, createProduct, getWithId, updateProduct }