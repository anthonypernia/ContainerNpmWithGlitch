
const fs = require('fs');
const { argv } = require('process');


class Contenedor{
    constructor(path){
        this.path = path;
    }

    getAll(){
        //La coloco en sincronico porque el enunciado dice que tiene que devolver un array
        try {
            const dataFromFile = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(dataFromFile);
        }catch(err){
            console.log("Error al leer el archivo, no hay datos o la ruta esta mal");
            return [];
        }
    }

    getById(id){
        try{
            const data = this.getAll();
            return data.find(item => item.id == id);
        }catch(err){
            console.log("Error al leer el archivo, no hay datos o la ruta esta mal");
            return [];
        }
    }

    deleteById(id){
        try{
            const jsonObj = this.getAll();
            const newJsonObj = jsonObj.filter(item => item.id != id);
            fs.promises.writeFile(this.path, JSON.stringify(newJsonObj), 'utf8')
            .then(() => {
                console.log(`Se actualizo el archivo borrando el id = ${id}`);
            })
            .catch(err => {
                console.log(err);
            });
        }catch(err){
            console.log(err);
        }
    }

    deleteAll(){
        try{
             fs.promises.writeFile(this.path, '', 'utf8')
            .then(() => {
                console.log("Se borro todo el archivo");
            })
            .catch(err => {
                console.log(err);
            });
        }catch(err){
            console.log(err);
        }
    }

     save(obj){
        try{
                    ///Aca leo el txt para poder obtener el ultimo id y seguir la secuencia
            const jsonObj =  this.getAll();
            if (jsonObj.length > 0){
                const lastId = jsonObj[jsonObj.length - 1].id;
                obj.id = lastId + 1;
            }else{
                obj.id = 1;
            }
            jsonObj.push(obj);
            fs.promises.writeFile(this.path, JSON.stringify(jsonObj), 'utf8')
            .then(() => {
                console.log(`Se guardo el producto en el archivo con id ${obj.id}`);
            })
            .catch(err => {
                console.log(err);
            });
        }catch(err){
            console.log(err);
        }
    }

    getRandomItem(){
        try{
            const data = this.getAll();
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        }catch(err){
            console.log(err);
        }
    }
}


//const contenedor = new Contenedor(argv[2]);
//console.log(contenedor.getAll());
//const obj =     {
//    title: 'react',
//    price: '$1.5555',
//    image: "https://github.com/anthonyperniah/anthonyperniah-shop/blob/master/src/img/react1.png?raw=true",
//}
//contenedor.save(obj);
//console.log(contenedor.getById(1));
//contenedor.deleteById(2);
//contenedor.deleteAll();


module.exports = Contenedor;