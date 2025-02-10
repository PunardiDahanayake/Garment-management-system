const express = require("express");
const Marketing = require("../model/marketing.model");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const marketing = await Marketing.find();
    res.status(200).json(marketing);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const marketing = await Marketing.find({ productName: id });
    res.status(200).json(marketing);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const {
      productName,
      marketingCost,
      remarks,
      description,
      approveStatus,
      informedStatus,
      createdDate,
    } = req.body;
    const marketing = await Marketing.create({
      productName,
      marketingCost,
      remarks,
      description,
      approveStatus,
      informedStatus,
      createdDate,
    });
    res.status(201).json(marketing);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
