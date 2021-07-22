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
                        fetch(url + "movie/"+ id +"/credits?api_key="+key +"&language=es" )
                            .then( resultado => {
                              if(resultado.status == 200) {
                                return resultado.text();
                              } else {
                                throw "Error en el servidor" 
                              }
                            })
                            .then( resultadotext => {
                              let reparto = JSON.parse(resultadotext).cast;
                              Cuerpo(pelicula, posterpeliculajson,reparto );
                            })
                            .catch( err => {
                              console.log(err);
                            });
                    })
                    .catch( err => {
                      console.log(err);
                    });
              })
              .catch( err => {
                console.log(err);
              });
}

function Cuerpo(item, gallery_list, reparto){
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

      var star_div_cali_movie = document.createElement('div');
      star_div_cali_movie.classList.add("stars-outer");

        var  star_item  = document.createElement('div');
        star_item.classList.add("stars-inner");

        const starPercentage = (item.vote_average/ 10) * 100;
        const starPercentageRounded = `${((starPercentage / 10) * 10)}%`;
        //document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
        star_item.style.width = starPercentageRounded; 
        //star_item.style.cssText =  `width: `+starPercentageRounded+ `px; `;

       // obj.style.cssText = 'position:absolute;top:300px;left:300px;width:200px;height:200px;-moz-border-radius:100px;border:1px  solid #ddd;-moz-box-shadow: 0px 0px 8px  #fff;display:none;';
       star_div_cali_movie.append(star_item);

      star_div_clasification_movie.append(star_div_cali_movie);
         var label_calificacion = document.createElement('label');
         label_calificacion.textContent = item.vote_average;
          var span_calificacion = document.createElement('span');
          span_calificacion.textContent = "/10";
        label_calificacion.append(span_calificacion);
      star_div_clasification_movie.append(label_calificacion);
    section_article.append(star_div_clasification_movie);

      var etiq_div_description_movie = document.createElement('div');
      etiq_div_description_movie.classList.add("description");
          var etiq_text_descrip = document.createElement('p');
          
          etiq_text_descrip.textContent = item.overview;

      etiq_div_description_movie.append(etiq_text_descrip);
    section_article.append(etiq_div_description_movie);


   
    var div_span = document.createElement('div');
    div_span.classList.add("div_detalles");
    var span_descripHide = document.createElement('span');
    span_descripHide.classList.add("detalles");
    span_descripHide.setAttribute('id','detalles_hide');
    span_descripHide.textContent = "Ver menos";
    var span_descripShow = document.createElement('span');
    span_descripShow.classList.add("detalles");
    span_descripShow.setAttribute('id','detalles_show');
    span_descripShow.textContent = "Detalles";
    div_span.append(span_descripHide, span_descripShow);
    section_article.append(div_span);

     var div_Imagenes = document.createElement('div');
     div_Imagenes.classList.add("titulo_Fotos");
     var label_fotos = document.createElement('label');
     label_fotos.textContent = "Imagenes";
     div_Imagenes.append(label_fotos);
     section_article.append(div_Imagenes);

      var gallery_path = document.createElement('div');
      gallery_path.classList.add("flex-content");
          gallery_list.forEach(function (element){
            try {
              var item_path = document.createElement('a');
              item_path.classList.add("gallery");
                var ima_path =  document.createElement('img');
                ima_path.src = urlimg + element.file_path; 
                ima_path.alt = "cover";
              item_path.append(ima_path);
              gallery_path.append(item_path);
            } catch (error) {
              
            }
          });
    section_article.append(gallery_path);

     var div_Reparto = document.createElement('div');
     div_Reparto.classList.add("titulo_Fotos");
     var label_fotos = document.createElement('label');
     label_fotos.textContent = "Reparto";
     div_Reparto.append(label_fotos);
     section_article.append(div_Reparto);

      var gallery_reparto = document.createElement('div');
      gallery_reparto.classList.add("flex-content");
                reparto.forEach(function (element){
                  try {
                    var item_path = document.createElement('a');
                    item_path.classList.add("gallery");
                    var ima_path =  document.createElement('img');
                    ima_path.src = urlimg + element.profile_path; 
                    ima_path.alt = "cover";
                    var div_nombreReparto = document.createElement('div');
                    div_nombreReparto.classList.add("div_nombreReparto");
                    var label_nombre_creditos = document.createElement('label');
                    label_nombre_creditos.classList.add("label_nombreReparto");
                    label_nombre_creditos.textContent = element.original_name;
                    var div_interprete = document.createElement('div');
                    div_interprete.classList.add("div_interprete");
                    var label_nombre_creditosintreprete = document.createElement('label');
                    label_nombre_creditosintreprete.textContent = "Interpretando a: " + element.character;
                    console.log(element);
                    div_nombreReparto.append(label_nombre_creditos);
                    div_interprete.append(label_nombre_creditosintreprete);
                    item_path.append(ima_path, div_nombreReparto, div_interprete);
                    
                    gallery_reparto.append(item_path);
                  } catch (error) {
                    
                  }
                  
                });
    section_article.append(gallery_reparto);

    var div_separador = document.createElement('div');
    div_separador.classList.add("div_separador");
    section_article.append(div_separador);

infohtml.append(section_article);

      var divimagen =  document.createElement('div');
      divimagen.classList.add('headerimage');
        var imagen =  document.createElement('img');
        imagen.classList.add('img_size' ,'object-cover');
        imagen.src = urlimg + item.backdrop_path;
      divimagen.append(imagen);
portada_principalhtml.append(divimagen);
}

$(document).on('click', '#detalles_show', function(e) {
  $('#detalles_show').css({
    'display': 'none'
  })
  $('#detalles_hide').css({
    'display': 'contents'
  })
  $('.description').css({
    'max-height': '500px',
    'transition': 'max-height 1s',
    'overflow-y': 'scroll'
  })
  e.stopPropagation(); 
});

$(document).on('click', '#detalles_hide', function(e) {
  $('#detalles_hide').css({
    'display': 'none'
  })
  $('.description').css({
      'max-height': '70px',
      'overflow-y': 'hidden'
  })
  $('#detalles_show').css({
    'display': 'contents'
  })
})
 
