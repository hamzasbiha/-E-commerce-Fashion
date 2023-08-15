const express=require('express')
const router=express.Router()
const authMiddleware=require('../controler/authMiddleware')

const {getAllProducts,getoneProudct,addProudct,UpdateProudct,deleteProudct}=require('../controler/proudcts');
router.use(authMiddleware(["Admin", "manager_product"]))

router.get('/',getAllProducts);
router.get('/:id', getoneProudct);
router.post('/addProudct', addProudct);
router.delete('/:id', deleteProudct)
router.put('/update/:id',UpdateProudct)

module.exports=router
