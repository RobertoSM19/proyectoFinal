let mysql=require('../conexion/db');

module.exports={
    crear:(req,res)=>{
        mysql.query(`INSERT INTO factura (id_cliente,id_vendedor,fecha) VALUES (${req.body.id_cliente},${req.body.id_vendedor},'${req.body.fecha}')`,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({tipo:200,msg:'Factura agregada',id:results.insertId});
            }
        });
    },
    listar:(req,res)=>{
        mysql.query('SELECT * FROM factura WHERE id_cliente=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    buscar:(req,res)=>{
        mysql.query('SELECT * FROM factura WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    borrar:(req,res)=>{
        mysql.query('DELETE FROM factura WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({msg:'Se elimino el cliente con id '+req.params.id,iDEliminado:req.params.id});
            }
        });
    },
    crearDetalle:(req,res)=>{
        for(let i=0;i<req.body.detallesFactura.length;i++){
            mysql.query(`INSERT INTO detalle_factura (id_factura,id_producto,cantidad,costo) VALUES (1,${req.body.detallesFactura[i].id_producto},${req.body.detallesFactura[i].cantidad},${req.body.detallesFactura[i].costo})`,(err,res,fields)=>{
                if(err){
                    res.json(error);
                } else{
                    console.log('hola');
                }
            });   
        };
        res.json({msg:'todo bien'});
    }
};