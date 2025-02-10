const express = require("express");
const Production = require("../model/production.model");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const production = await Production.find();
    res.status(200).json(production);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const production = await Production.find({ productName: id });
    res.status(200).json(production);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const { _id, productName, amountSpent, confirmation, quality } = req.body;
    const production = await Production.create({
      _id,
      productName,
      amountSpent,
      confirmation,
      quality,
    });
    res.status(201).json(production);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
