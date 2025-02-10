const express = require("express");
var router = express.Router();
var ObjectID= require('mongoose').Types.ObjectId


var {PatternMaking} = require("../model/patternMaking.model");

router.get("/get", async (req, res) => {



  try {
    PatternMaking.find((err,docs)=>{
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
    const patternMaking = await PatternMaking.find({ designName: id, });
    res.status(200).json(patternMaking);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const {
    
      designName,
      material,
      materialCost,
      color,
      price,
      genderType,
      size,
    } = req.body;


    var newRecord= new PatternMaking({
      designName:designName,
      material:material,
      materialCost:materialCost,
      color:color,
      price:price,
      genderType:genderType,
      size:size,
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



//edit
router.put('/edit/:id',(req,res)=>{
    
  const { designName,
    material,
    materialCost,
    color,
    price,
    genderType,
    size } = req.body;

  var record= new PatternMaking({
    _id: req.params.id,
    designName:designName,
    material:material,
    materialCost:materialCost,
    color:color,
    price:price,
    genderType:genderType,
    size:size,
  })

  PatternMaking.findByIdAndUpdate(req.params.id, { $set: record},{new:true}, (err,docs)=>{
    if(!err){
        res.send(docs)
    }else{
        res.send(err)
        console.log(JSON.stringify(err,undefined,2))
    }
})
})



//delete

router.delete('/delete/:id',(req,res)=>{
    
  PatternMaking.findByIdAndRemove(req.params.id,(err,docs)=>{
      if(!err){
          res.send(docs)
      }else{
          res.send(err)
          console.log(JSON.stringify(err,undefined,2))
      }
  })
})

module.exports = router;






