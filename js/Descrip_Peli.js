/**
 * @param String name
 * @return String
 */

 var url = "https://api.themoviedb.org/3/";
 var key = '133e62f28b7a78182442c73f2c90e8b9';
 var urlimg = 'http://image.tmdb.org/t/p/w500';

var body2 = document.getElementById("body2");

document.addEventListener("DOMContentLoaded", function () {
    ObtenerPelicula(getParameterByName('id'))
}
)

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function goBack() {
    window.history.back()
}

function ObtenerPelicula(id) {
    fetch(url + "movie/"+ id +"?api_key="+key + "&language=es&page=1")
              .then( resultado => {
                if(resultado.status == 200) {
                  return resultado.text();
                } else {
                  throw "Error en el servidor" 
                }
              })
              .then( resultadotext => {
                let pelicula = JSON.parse(resultadotext);
                Cuerpo(pelicula);
              })
              .catch( err => {
                console.log(err);
              });
}

function Cuerpo(item){
    console.log(item);   
    var divimagen =  document.createElement('div');
    divimagen.classList.add('headerimage');
    var imagen =  document.createElement('img');
    imagen.classList.add('img_size' ,'object-cover');
    imagen.src = urlimg + item.backdrop_path;
    divimagen.append(imagen);
    
}
