const jwt=require('jsonwebtoken');

module.exports={
    validarRegistro:(req,res,next)=>{
        if(!req.body.nombre||req.body.nombre.length<3){
            return res.status(400).json({
                msg:'Porfavor ingrese un nombre de usuario con minimo 3 caracteres'
            });
        }

        if(!req.body.contraseña||req.body.contraseña.length<6){
            return res.status(400).json({
                msg:'Porfavor ingresa una contraseña con minimo 6 caracteres'
            });
        }

        if(!req.body.contraseña_repeat||req.body.contraseña!=req.body.contraseña_repeat){
            return res.status(400).json({
                msg:'Ambas contraseñas deben ser iguales'
            });
        }
        next();
    },
    loggeado:(req,res,next)=>{
        try{
            const token= req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(
                token,
                'SECRETKEY'
            );
            req.useData=decoded;
            next();
        } catch(err){
            return res.status(401).json({
                msg:'Tu sesion no es valida'
            });
        }
    }
};