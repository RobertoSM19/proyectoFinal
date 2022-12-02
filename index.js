const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router=require("./api/routes/router");
app.use('/api',router);

app.listen(3000,()=>console.log('Escuchando desde el puerto 3000'));