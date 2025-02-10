require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./database/db-connection');


const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const accountRouter = require('./router/account.route');
const hrRouter = require("./router/hr.route");
const industrialEngineeringRouter = require("./router/industrialEngineering.route");
const inventoryStockRouter = require("./router/inventoryStock.route");
const marketingRouter = require("./router/marketing.route");
const patternMakingRouter = require("./router/patternMaking.route");
const productionRouter = require("./router/production.route");
const qualityControlRouter = require("./router/qualityControl.route");

app.use("/api/v1/accountRouter", accountRouter);
app.use("/api/v1/hrRouter", hrRouter);
app.use("/api/v1/industrialEngineeringRouter", industrialEngineeringRouter);
app.use("/api/v1/inventoryStockRouter", inventoryStockRouter);
app.use("/api/v1/marketingRouter", marketingRouter);
app.use("/api/v1/patternMakingRouter", patternMakingRouter);
app.use("/api/v1/productionRouter", productionRouter);
app.use("/api/v1/qualityControlRouter", qualityControlRouter);

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log("Server started at port " + Port);
});
