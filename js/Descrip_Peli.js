/**
 * @param String name
 * @return String
 */

 var portada_principalhtml =  document.getElementById("portada_principal");
 var posterpelihtml =  document.getElementById("img_peli");
 var infohtml =  document.getElementById("info");
 

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
   fetch(url + "movie/"+ id +"?api_key="+key + "&language=es")
              .then( resultado => {
                if(resultado.status == 200) {
                  return resultado.text();
                } else {
                  throw "Error en el servidor" 
                }
              })
              .then( resultadotext => {
                let pelicula = JSON.parse(resultadotext);
                //
                     fetch(url + "movie/"+ id +"/images?api_key="+key+"&language=es" )
                    .then( resultado => {
                      if(resultado.status == 200) {
                        return resultado.text();
                      } else {
                        throw "Error en el servidor" 
                      }
                    })
                    .then( resultadotext => {
                      let posterpeliculajson = JSON.parse(resultadotext).posters;
                      Cuerpo(pelicula, posterpeliculajson );
                    })
                    .catch( err => {
                      console.log(err);
                    });
                //
                
              })
              .catch( err => {
                console.log(err);
              });
}
// async function ObtenerPosterPelicula(id) {
//   await fetch(url + "movie/"+ id +"/images?api_key="+key )
//             .then( resultado => {
//               if(resultado.status == 200) {
//                 return resultado.text();
//               } else {
//                 throw "Error en el servidor" 
//               }
//             })
//             .then( resultadotext => {
//               let posterpeliculajson = JSON.parse(resultadotext).posters;
//               console.log(posterpeliculajson);
//               return posterpeliculajson;
//             })
//             .catch( err => {
//               console.log(err);
//             });
// }

function Cuerpo(item, gallery_list){
    console.log(item);  
    console.log(gallery_list); 
    var Listacategorias = "";
    
    var a_imagen =  document.createElement('a');
    a_imagen.classList.add('portada');
    var img =  document.createElement('img');
    img.classList.add('cover');
    img.src = urlimg + item.poster_path;
    a_imagen.append(img);
    posterpelihtml.append(a_imagen);

    var section_article =  document.createElement('article');
    section_article.classList.add('details');
      var div_title =  document.createElement('div');
      div_title.classList.add('title1');
      div_title.textContent = item.title + "("+ item.release_date.substring(0, 4) +")";
        var div_duration =  document.createElement('div');
        div_duration.classList.add('duration_movie');
          var label_duration =  document.createElement('label');
          label_duration.textContent = item.runtime + "min";
        div_duration.append(label_duration);
      div_title.append(div_duration);
    section_article.append(div_title);
      //
      var etiq_div_clasification_movie = document.createElement('div');
      etiq_div_clasification_movie.classList.add("classification_movie");
          var etiq_text_clasifi = document.createElement('label');
          item.genres.forEach(function (element)
          {
              Listacategorias += element.name + " " ;
          });
          etiq_text_clasifi.textContent = Listacategorias;     
      etiq_div_clasification_movie.append(etiq_text_clasifi);
    section_article.append(etiq_div_clasification_movie);
//
      var star_div_clasification_movie = document.createElement('div');
      star_div_clasification_movie.classList.add("calification");
        var  star_item  = document.createElement('i');
        star_item.classList.add("fas","fa-star");
        var  star_item1  = document.createElement('i');
        star_item1.classList.add("fas","fa-star");
        var  star_item2  = document.createElement('i');
        star_item2.classList.add("fas","fa-star");
        var  star_item3  = document.createElement('i');
        star_item3.classList.add("fas","fa-star");
        var  star_item4  = document.createElement('i');
        star_item4.classList.add("fas","fa-star");

      star_div_clasification_movie.append(star_item,star_item1,star_item2,star_item3,star_item4);
         var label_calificacion = document.createElement('label');
         label_calificacion.textContent = item.vote_average;
      star_div_clasification_movie.append(label_calificacion);
    section_article.append(star_div_clasification_movie);

      var etiq_div_description_movie = document.createElement('div');
      etiq_div_description_movie.classList.add("description");
          var etiq_text_descrip = document.createElement('p');
          etiq_text_descrip.textContent = item.overview;
      etiq_div_description_movie.append(etiq_text_descrip);
    section_article.append(etiq_div_description_movie);

      var gallery_path = document.createElement('div');
      gallery_path.classList.add("flex-content");
          gallery_list.forEach(function (element){
            var item_path = document.createElement('a');
            item_path.classList.add("gallery");
              var ima_path =  document.createElement('img');
              console.log(urlimg + element.file_path);
              ima_path.src = urlimg + element.file_path; 
              ima_path.alt = "cover";
            item_path.append(ima_path);
            gallery_path.append(item_path);
          });
    section_article.append(gallery_path);
infohtml.append(section_article);

      var divimagen =  document.createElement('div');
      divimagen.classList.add('headerimage');
        var imagen =  document.createElement('img');
        imagen.classList.add('img_size' ,'object-cover');
        imagen.src = urlimg + item.backdrop_path;
      divimagen.append(imagen);
portada_principalhtml.append(divimagen);

}
 