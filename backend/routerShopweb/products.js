const express=require("express")
const router=express.Router()


const {getAllProducts,getoneProudct}=require('../controler/proudcts');


router.get("/",getAllProducts);
router.get("/:id", getoneProudct);



module.exports = router;

module.exports=router
