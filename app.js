const express = require("express");
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

// Import all routes
const productsRouter = require("./routes/product");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/api/v1", productsRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", orderRouter);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
