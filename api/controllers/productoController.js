let mysql=require('../conexion/db');

module.exports={
    crear:(req,res)=>{
        mysql.query(`INSERT INTO productos (nombre,cantidad,costo) VALUES ('${req.body.nombre}',${req.body.cantidad},${req.body.costo})`,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({tipo:200,msg:'Producto agregado',id:results.insertId});
            }
        });
    },
    listar:(req,res)=>{
        mysql.query('SELECT * FROM productos',(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    buscar:(req,res)=>{
        mysql.query('SELECT * FROM productos WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    borrar:(req,res)=>{
        mysql.query('DELETE FROM productos WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({msg:'Se elimino el producto con id '+req.params.id,idEliminado:req.params.id});
            }
        });
    }
};