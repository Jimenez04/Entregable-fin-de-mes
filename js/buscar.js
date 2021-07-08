
var availableTags = [];
$("#tags").keyup(function () {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=133e62f28b7a78182442c73f2c90e8b9&language=es&query=" +$("#tags").val())
          .then( resultado => {
            if(resultado.status == 200) {
              return resultado.text();
            } else {
              throw "Error en el servidor" 
            }
          })
          .then( resultadotext => {
            let pelicula = JSON.parse(resultadotext).results;
            pelicula.forEach(function (element)
                 {      
                     availableTags.push(element.title);
                console.log(element);
                });
          })
          .catch( err => {
            console.log(err);
          });
          $( "#tags" ).autocomplete({    
source: availableTags
});
availableTags.length = 0;
});