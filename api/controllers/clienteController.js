let mysql=require('../conexion/db');

module.exports={
    crear:(req,res)=>{
        mysql.query(`INSERT INTO clientes (nombre,apellido,telefono) VALUES ('${req.body.nombre}','${req.body.apellido}',${req.body.telefono})`,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({tipo:200,msg:'Cliente agregado',id:results.insertId});
            }
        });
    },
    listar:(req,res)=>{
        mysql.query('SELECT * FROM clientes',(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    buscar:(req,res)=>{
        mysql.query('SELECT * FROM clientes WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    borrar:(req,res)=>{
        mysql.query('DELETE FROM clientes WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({msg:'Se elimino el cliente con id '+req.params.id,iDEliminado:req.params.id});
            }
        });
    }
};