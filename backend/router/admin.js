const express = require('express');
const router=express.Router();


const {getAllAdmins,getOne,addAdmin,deleteone,updateAdmin,login}=require("../controler/admin")

router.get('/getAll',getAllAdmins);
router.get('/:email', getOne);
router.post('/add', addAdmin);
router.post('/login', login);

router.delete('/:id', deleteone)
router.put('/id',updateAdmin)

module.exports=router