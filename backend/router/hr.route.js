const express = require("express");
var router = express.Router();
//var ObjectID= require('mongoose').Types.ObjectId
var { Hr } = require("../model/hr.model");

router.get("/get", async (req, res) => {
  try {
    Hr.find((err,docs)=>{
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
    const hr = await Hr.find({ 
      fName: id,
     });
    res.status(200).json(hr);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const {
      //empId,
      fName,
      lName,
      nic,
      phoneNumber,
      civilStatus,
      userRole,
      address,
      gender,
      dob,
      joinDate,
    } = req.body;



   var newRecord= new Hr({
      //empId:empId,
      fName:fName,
      lName:lName,
      nic:nic,
      phoneNumber:phoneNumber,
      civilStatus:civilStatus,
      userRole:userRole,
      address:address,
      gender:gender,
      dob:dob,
      joinDate:joinDate,
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
    
  const {
    
    fName,
    lName,
    nic,
    phoneNumber,
    civilStatus,
    userRole,
    address,
    gender,
    dob,
    //joinDate, 
  } = req.body;

  var record= new Hr({
    _id: req.params.id,
  
    fName:fName,
    lName:lName,
    nic:nic,
    phoneNumber:phoneNumber,
    civilStatus:civilStatus,
    userRole:userRole,
    address:address,
    gender:gender,
    dob:dob,
    //joinDate:joinDate,
  })


  Hr.findByIdAndUpdate(req.params.id, { $set: record},{new:true}, (err,docs)=>{
    if(!err){
        res.send(docs)
    }else{
        res.send(err)
        console.log(JSON.stringify(err,undefined,2))
    }
})
})

router.delete('/delete/:id',(req,res)=>{
    
  Hr.findByIdAndRemove(req.params.id,(err,docs)=>{
      if(!err){
          res.send(docs)
      }else{
          res.send(err)
          console.log(JSON.stringify(err,undefined,2))
      }
  })
})







module.exports = router;