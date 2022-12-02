let mysql=require('../conexion/db');

module.exports={
    crear:(req,res)=>{
        mysql.query(`INSERT INTO vendedores (nombre,apellido,telefono) VALUES ('${req.body.nombre}','${req.body.apellido}',${req.body.telefono})`,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({tipo:200,msg:'Vendedor agregado',id:results.insertId});
            }
        });
    },
    listar:(req,res)=>{
        mysql.query('SELECT * FROM vendedores',(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    buscar:(req,res)=>{
        mysql.query('SELECT * FROM vendedores WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json(results);
            }
        });
    },
    borrar:(req,res)=>{
        mysql.query('DELETE FROM vendedores WHERE id=?',req.params.id,(error,results,fields)=>{
            if(error){
                res.json(error);
            }else{
                res.json({msg:'Se elimino el vendedor con id '+req.params.id,iDEliminado:req.params.id});
            }
        });
    }
};