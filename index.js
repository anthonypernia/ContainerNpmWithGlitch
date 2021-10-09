
let express = require('express');
let Contenedor = require('./Contenedor');

let app = express();
const PORT = 8080
let pathData = "./data.txt"
const contenedor = new Contenedor(pathData);

app.listen(PORT, () => {
    console.log(`We are connected in port = ${PORT}`);
});
app.on('error', err => {
    console.log(`We have an error =>  ${err}`);
});
app.get('/', (req, res) => {
    res.send(`<h1> Hi!</h1>
                <h2>You can use three entry points</h2>
                <ul>
                    <br>
                    <li> <a href="/">This "/" ,  if you don't want anything</a> </li>
                    <br>
                    <li> <a href="/productos">This "/productos" if you want a products list</a> </li>
                    <br>
                    <li> <a href="/productoRandom">This "/productoRandom" if you want a rambdom product from products list</a> </li>
                </ul>`);
});

app.get('/productos', (req, res) => {
    res.json( contenedor.getAll() );
});

app.get('/productoRandom', (req, res) => {
    res.json( contenedor.getRandomItem() );
});
