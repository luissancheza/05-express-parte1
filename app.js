const { response } = require('express');
const express = require ('express');

const app = express();

const usuarios = [
    {id:1, nombre:"Luis"},
    {id:2, nombre:"Jose"},
    {id:3, nombre:"Ana"},
];

app.get('/', (req, res)=>{
    res.send("Hola mundo desde Express");
}); // Petición de información 

app.get('/api/usuarios', (req, res)=>{
    res.send(['grover', 'luis', 'Ana']);
});

// app.get('/api/usuarios/:id', (req, res)=>{
//     res.send(req.query);
// });

app.get('/api/usuarios/:id', (req, res)=>{
    let usuario = usuarios.find(u => u.id == parseInt(req.params.id));
    if(!usuario) res.status(404).send("El usuario no fue encontrado");
    res.send(usuario);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el pruerto: ${port}`);
});
// app.post();// Envio de atos
// app.put();// Actualizacion
// app.delete(); //Eliminacion