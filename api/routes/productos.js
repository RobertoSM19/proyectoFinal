let router=require('express').Router();
let productoController=require('../controllers/productoController');

router.get('/',(req,res)=>{
   productoController.listar(req,res);
});

router.get('/:id',(req,res)=>{
   productoController.buscar(req,res);
});

router.post('/',(req,res)=>{
    productoController.crear(req,res);
});

router.delete('/:id',(req,res)=>{
    productoController.borrar(req,res);
});

module.exports=router;