const http = require('http');
const fs = require('fs');
const axios = require('axios');
const ruta = 'https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json';

http.createServer((req, response) => {
    axios.get(ruta).then( resquest => {
        LeerPagina( strContenido => {
          strContenido = strContenido.replace('{{placeholder}}', GenerarTajetas(resquest.data));
          response.write(strContenido);
          response.end();
        });
    });
}).listen(8080);

function LeerPagina(callback)
{
    fs.readFile('index.html', (error, data) => {
        callback(data.toString())
    })
}

function GenerarTajetas(lstCategorias)
{
    var menu = "";
    for(let val of lstCategorias) {
        menu += ProcesaeCategoria(val)
    }
    return menu
}

function ProcesaeCategoria(categoria)
{
    let header = Card_Header(categoria.name);
    var body = "";
    for(let producto of categoria.products)
        body += Card(producto);
    return `<div class="card">
        ${header}
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body row">
                ${body}
            </div>
        </div>
    </div>`;
}

function Card_Header(nombreCategoria)
{
    return `<div class="card-header" id="headingOne">
        <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            ${nombreCategoria}
        </button>
        </h2>
    </div>`
}

function Card(producto)
{
    return `<div class"col-12 col-ms-6 col-md-4 col-lg-3 col-xl-2" >
        <div class="card" style="width: 18rem;">
            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
                <h5 class="card-title">${producto.price}</h5>
                <a href="#" class="btn btn-primary">Add to carr</a>
            </div>
        </div>
    </div>`;
}
