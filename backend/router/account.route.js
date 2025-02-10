const express = require("express")
var {Account} = require("../model/account.model")
var ObjectID= require('mongoose').Types.ObjectId
var router = express.Router()

// router.get('/get', (req, res) => {
//     get(req, res);
// });

// router.get('/get/:id', (req, res) => {
//     getbyId(req, res);
// });

// router.post('/save', (req, res) => {
//     save(req, res);
// });

// async function get(req, res) {
//     try {
//         const products = await products.find();
//         res.status(200).json(products);
//       } catch (e) {
//         res.status(400).send(e.message);
//       }
// }

router.get("/get", async (req, res) => {
  try {
     Account.find((err,docs)=>{
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
    const account = await Account.find({ empId: id,
     });
    res.status(200).json(account);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/save", async (req, res) => {
  try {
    const { accountId, empId, gender, salary, salaryType, laborCost } =
      req.body;
      var newRecord= new Account({
        accountId:accountId,
        empId:empId,
        gender:gender,
        salary:salary,
        salaryType:salaryType,
        laborCost:laborCost
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
    
  const { accountId, empId, gender, salary, salaryType, laborCost } = req.body;

  var record= new Account({
    _id: req.params.id,
    accountId:accountId,
    empId:empId,
    gender:gender,
    salary:salary,
    salaryType:salaryType,
    laborCost:laborCost
  })

  Account.findByIdAndUpdate(req.params.id, { $set: record},{new:true}, (err,docs)=>{
    if(!err){
        res.send(docs)
    }else{
        res.send(err)
        console.log(JSON.stringify(err,undefined,2))
    }
})
})


router.delete('/delete/:id',(req,res)=>{
    
  Account.findByIdAndRemove(req.params.id,(err,docs)=>{
      if(!err){
          res.send(docs)
      }else{
          res.send(err)
          console.log(JSON.stringify(err,undefined,2))
      }
  })
})

module.exports = router;
