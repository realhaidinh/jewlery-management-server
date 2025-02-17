const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require("dotenv").config();
const helmet = require('helmet');


const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(express.static("public"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = require("./models");

db.sequelize.sync({ force: true }).then((req) => {
  app.listen(5000, () => {
    console.log("server running");
  });
});

// Main
app.get("/", (req, res) => {
  res.render("/public/index", { });
})

// Router list
const productRouter = require("./routes/product/product");
const productTypeRouter = require("./routes/product_type/product_type");
const buyRouter = require("./routes/buy/buy");
const sellRouter = require("./routes/sell/sell");
const serviceRouter = require("./routes/service/service");
const serviceFormRouter = require("./routes/service_form/service_form");
const supplierRouter = require("./routes/supplier/supplier");
const reportRouter = require("./routes/report/report");

// Error handlers
app.use(express.json());
app.use(helmet());
app.use(cors());



// Use routers
app.use("/product", productRouter);
app.use("/product-type", productTypeRouter);
app.use("/buy", buyRouter);
app.use("/sell", sellRouter);
app.use("/service", serviceRouter);
app.use("/service-form", serviceFormRouter);
app.use("/supplier", supplierRouter);
app.use("/report", reportRouter);
// use Middleware for error and not found




app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});

// TODO:
// * BuyForm controller
// * Supplier controller
// * Authorization tables, controllers
// * ServiceForm tables, controllers
// * Reports tables, controllers