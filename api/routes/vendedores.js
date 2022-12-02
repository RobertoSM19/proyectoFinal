let router=require('express').Router();
let vendedorController=require('../controllers/vendedorController');

router.get('/',(req,res)=>{
    vendedorController.listar(req,res);
});

router.get('/:id',(req,res)=>{
   vendedorController.buscar(req,res);
});

router.post('/',(req,res)=>{
    vendedorController.crear(req,res);
});

router.delete('/:id',(req,res)=>{
    vendedorController.borrar(req,res);
});

module.exports=router;