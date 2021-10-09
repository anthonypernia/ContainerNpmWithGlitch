let http = require('http');
let ngrok = require('ngrok');
let express = require('express');

///Server con http

//const server = http.createServer((req, res) => {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//});
//let connectedServer = server.listen(4000, () => {
//    console.log(`Server is running on port = ${connectedServer.address().port}`);
//});

///Server con express

let app = express();

app.listen(5000, () => {
    console.log(`Estamos conectados `);
});
app.on('error', err => {
    console.log(err);
});
app.get('/', (req, res) => {
    ////PODEMOS ENVIAR VARIOS TIPOS DE RESPUESTA
    //res.send('Hello World\n  1');
    //res.json({
    //    name: 'Juan',
    //    lastName: 'Perez'
    //});
    res.send('Hello World\n');
});

app.get('/user', (req, res) => {
    res.send('Hello User\n');
});



(async () => {
    let url = await ngrok.connect(5000);
    console.log(url);
})();