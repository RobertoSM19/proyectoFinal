let router=require('express').Router();
let clienteController=require('../controllers/clienteController');

router.get('/',(req,res)=>{
    clienteController.listar(req,res);
});

router.get('/:id',(req,res)=>{
   clienteController.buscar(req,res);
});

router.post('/',(req,res)=>{
    clienteController.crear(req,res);
});

router.delete('/:id',(req,res)=>{
    clienteController.borrar(req,res);
});

module.exports=router;