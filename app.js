const { response } = require('express');
const express = require ('express');
const logger = require('./logger');
const Joi = require('joi');

const app = express();

app.use(express.json());

app.use(logger);

app.use(function(req, res, next){
    console.log("Autenticación......");
    next();
});

const usuarios = [
    {id:1, nombre:"Luis"},
    {id:2, nombre:"Jose"},
    {id:3, nombre:"Ana"},
];

app.get('/', (req, res)=>{
    res.send("Hola mundo desde Express");
}); // Petición de información 

app.get('/api/usuarios', (req, res)=>{
    res.send(usuarios);
});

// app.get('/api/usuarios/:id', (req, res)=>{
//     res.send(req.query);
// });

app.get('/api/usuarios/:id', (req, res)=>{
    // let usuario = usuarios.find(u => u.id == parseInt(req.params.id));
    let usuario = existeUsuario(req.params.id);
    if(!usuario) res.status(404).send("El usuario no fue encontrado");
    res.send(usuario);
});


app.post('/api/usuarios/', (req, res)=>{
    const {error, value} = validarUsuario(req.body.nombre);

    if(!error){
        const usuario = {
            id: usuarios.length+1,
            nombre: value.nombre
        };
        usuarios.push(usuario);
        res.send(usuario);
    }else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
});

app.put('/api/usuarios/:id', (req, res)=>{
    //Encontrar si existe el objeto usuario que voy a modificar 
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(400).send('Usuario no encontrado');
        return;
    }

    const {error, value} = validarUsuario(req.body.nombre);

    if(error){
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);

});

app.delete('/api/usuarios/:id', (req, res)=>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(400).send('Usuario no encontrado');
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);

    res.send(usuario);
});
function existeUsuario(id){
     return usuarios.find(u => u.id === parseInt(id));
}


function validarUsuario(nomb){
    const schema = Joi.object({
        nombre: Joi.string()
        .min(3)
        .required()
    });

    return schema.validate({nombre: nomb});
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el pruerto: ${port}`);
});
// app.post();// Envio de atos
// app.put();// Actualizacion
// app.delete(); //Eliminacion