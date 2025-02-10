const express = require("express");
const InventoryStock = require("../model/inventoryStock.model");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const inventoryStock = await InventoryStock.find();
    res.status(200).json(inventoryStock);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const inventoryStock = await InventoryStock.find({ productName: id });
    res.status(200).json(inventoryStock);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const { itemCode, productName, price, quantity, expireDate } = req.body;
    const inventoryStock = await InventoryStock.create({
      itemCode,
      productName,
      price,
      quantity,
      expireDate,
    });
    res.status(201).json(inventoryStock);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
