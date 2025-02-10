const express = require("express")
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { IndustrialEngineering } = require('../model/industrialEngineering.model')

router.get("/get", async (req, res) => {
  try {
    IndustrialEngineering.find((err,docs)=>{
      if(!err){
          res.send(docs)
      }else{
          console.log(JSON.stringify(err,undefined,2))
      }
    })
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const industrialEngineering = await IndustrialEngineering.find({
      poductMethod: id,
    });
    res.status(200).json(industrialEngineering);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const { poductMethod, researchStatus, description, cost } = req.body;

    var newRecord= new IndustrialEngineering({
      poductMethod: poductMethod,
      researchStatus: researchStatus,
      description: description,
      cost: cost
    })

    newRecord.save((err,docs)=>{
        if(!err){
          res.send(docs)
        }else{
          res.send(err)
          console.log(JSON.stringify(err,undefined,2))
        }
    })

  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put('/edit/:id',(req,res)=>{
    
    const { poductMethod, researchStatus, description, cost } = req.body;

    var record= new IndustrialEngineering({
      _id: req.params.id,
      poductMethod: poductMethod,
      researchStatus: researchStatus,
      description: description,
      cost: cost
    })

    IndustrialEngineering.findByIdAndUpdate(req.params.id, { $set: record},{new:true}, (err,docs)=>{
      if(!err){
          res.send(docs)
      }else{
          res.send(err)
          console.log(JSON.stringify(err,undefined,2))
      }
  })
})

router.delete('/delete/:id',(req,res)=>{
    
    IndustrialEngineering.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router;
