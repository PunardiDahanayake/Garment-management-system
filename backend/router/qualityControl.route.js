const express = require("express");
const QualityControl = require("../model/qualityControl.model");

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const qualityControl = await QualityControl.find();
    res.status(200).json(qualityControl);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const qualityControl = await QualityControl.find({ type: id });
    res.status(200).json(qualityControl);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const {
      fabricId,
      type,
      remark,
      description,
      reportedDate,
      status,
      priority,
    } = req.body;
    const qualityControl = await QualityControl.create({
      fabricId,
      type,
      remark,
      description,
      reportedDate,
      status,
      priority,
    });
    res.status(201).json(qualityControl);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
