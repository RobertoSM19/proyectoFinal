const registrarU=document.getElementById('btnRgtr');
registrarU.addEventListener('click',()=>{
    let name=document.getElementById('nameU').value;
    let contraseña=document.getElementById('contraseñaU').value;
    let contraseña_repeat=document.getElementById('contraseña2').value;
    let resultados={nombre:name,contraseña:contraseña,contraseña_repeat:contraseña_repeat}
    // console.log(resultados);
    fetch('http://localhost:3000/api/sign-up',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
        console.log(datos);
        let app=document.getElementById('app');
        let app2=document.getElementById('app2');
        let appPadre=document.getElementById('appPadre');
        let info=document.getElementById('info');
        app.style.display='none';
        app2.style.display='none';
        appPadre.style.display='block';
        info.innerHTML=`<h3>${datos.msg}' '${datos.nombre}</h3>`;
    });
});


const login=document.getElementById('btnAgr');
login.addEventListener('click',()=>{
    let name=document.getElementById('name').value;
    let contraseña=document.getElementById('contraseña').value;
    let resultados={nombre:name,contraseña:contraseña}
    fetch('http://localhost:3000/api/login',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
        console.log(datos);
        let app=document.getElementById('app');
        let app2=document.getElementById('app2');
        let appPadre=document.getElementById('appPadre');
        let info=document.getElementById('info');
        app.style.display='none';
        app2.style.display='none';
        appPadre.style.display='block';
        info.innerHTML=`<h3>${datos.msg}</h3>`;
    });
});


const btnC=document.getElementById('btnAñdC');
btnC.addEventListener('click',()=>{
    let nombre=document.getElementById('nameC').value
    let apellido=document.getElementById('apellidoC').value
    let celular=document.getElementById('celular').value
    let resultados={nombre:nombre,apellido:apellido,telefono:celular};
    fetch('http://localhost:3000/api/clientes/',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
        let info=document.getElementById('info2');
        info.innerHTML=`<h3>${datos.msg} con el id ${datos.id}</h3>`;
    })
});


const btnP=document.getElementById('btnAñdP');
btnP.addEventListener('click',()=>{
    let nombre=document.getElementById('nameP').value
    let cantidad=document.getElementById('cantidadP').value
    let costo=document.getElementById('costoP').value
    let resultados={nombre:nombre,cantidad:cantidad,costo:costo};
    fetch('http://localhost:3000/api/productos/',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
        let info=document.getElementById('info3');
        info.innerHTML=`<h3>${datos.msg} con el id ${datos.id}</h3>`;
    })
});


const btnV=document.getElementById('btnAñdV');
btnV.addEventListener('click',()=>{
    let nombre=document.getElementById('nameV').value
    let apellido=document.getElementById('apellidoV').value
    let celular=document.getElementById('celularV').value
    let resultados={nombre:nombre,apellido:apellido,telefono:celular};
    fetch('http://localhost:3000/api/vendedores/',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
        let info=document.getElementById('info4');
        info.innerHTML=`<h3>${datos.msg} con el id ${datos.id}</h3>`;
    });
});

fetch('http://localhost:3000/api/clientes')
    .then(response => response.json())
    .then(datos => {
        let menu=document.getElementById('cliente');
        let opciones='';
        for(let i=0;i<datos.length;i++){
            opciones+=`<option id=${i} value=${datos[i].id}>${datos[i].nombre}</option>`;
        }
        menu.innerHTML+=opciones;
    });

    fetch('http://localhost:3000/api/vendedores')
    .then(response => response.json())
    .then(datos => {
        let menu=document.getElementById('vendedor');
        let opciones='';
        for(let i=0;i<datos.length;i++){
            opciones+=`<option id=${i} value=${datos[i].id}>${datos[i].nombre}</option>`;
        }
        menu.innerHTML+=opciones;
    });


const btnDP=document.getElementById('btnDP');
btnDP.addEventListener('click',()=>{
    let menuV=document.getElementById('vendedor');
    let menuC=document.getElementById('cliente');
    let fecha=document.getElementById('fecha').value
    let resultados={id_cliente:menuC.value,id_vendedor:menuV.value,fecha:fecha}
    fetch('http://localhost:3000/api/facturas/',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
        console.log(datos);
    })

    let tipoP=document.getElementById('tipoP').value;
    let info=document.getElementById('info5');
    info.innerHTML='<p></p>';
    for(let i=1;i<=tipoP;i++){
        info.innerHTML+=`<select id='productos${i}'></select><br>
        <label>Cantidad: </label><br>
        <input id="cantidad${[i]}" type="text"><br>
        <label>Costo: </label><br>
        <input id="costo${[i]}" type="text"><br>`;
    };
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(datos => {
            for(let j=1;j<=tipoP;j++){
                let menu=document.getElementById(`productos${j}`);
                let opciones='';
                for(let k=0;k<datos.length;k++){
                    opciones+=`<option id=${k} value=${datos[k].id}>${datos[k].nombre}</option>`;
                }
                menu.innerHTML+=opciones;
            }
        });
});

const btnAñdF=document.getElementById('btnAñdF');
btnAñdF.addEventListener('click',()=>{
    let tipoP=document.getElementById('tipoP').value;
    let res=[];
    for(let i=1;i<=tipoP;i++){
        let menu=document.getElementById(`productos${i}`).value;
        let cantidad=document.getElementById(`cantidad${i}`).value;
        let costo=document.getElementById(`costo${i}`).value;
        res.push({id_producto:menu,cantidad:cantidad,costo:costo});
    };
    let resultados={detallesFactura:res};
    fetch('http://localhost:3000/api/facturas/detalle',{
        method:'POST',
        body:JSON.stringify(resultados),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(datos => {
         console.log(datos);
    });
});