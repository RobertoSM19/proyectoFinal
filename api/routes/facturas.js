let router=require('express').Router();
let facturaController=require('../controllers/facturaController');

router.get('/',(req,res)=>{
    facturaController.listar(req,res);
});

router.get('/:id',(req,res)=>{
   facturaController.buscar(req,res);
});

router.post('/',(req,res)=>{
    facturaController.crear(req,res);
});

router.post('/detalle',(req,res)=>{
    facturaController.crearDetalle(req,res);
});

router.delete('/:id',(req,res)=>{
    facturaController.borrar(req,res);
});

module.exports=router;