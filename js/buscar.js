var url = "https://api.themoviedb.org/3/";
 var key = '133e62f28b7a78182442c73f2c90e8b9';
 var urlimg = 'http://image.tmdb.org/t/p/w500';

 $(document).ready(function(){
  $('img').each(function(){
      if($(this)[0].naturalHeight == 0){
           $(this).attr('src','../img/not-found.png');
      }
  });
});

var availableTags = [];
 $("#text_busqueda").keyup(function () {
   if ($("#text_busqueda").val().length>0) {
     fetch("https://api.themoviedb.org/3/search/movie?api_key=133e62f28b7a78182442c73f2c90e8b9&language=es&query=" +$("#text_busqueda").val())
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
              availableTags.push({"label":element.title, "value":element.title, "id":element.id,   icon: element.poster_path});
           });
     })
     .catch( err => {
       console.log(err);
     });

     $("#text_busqueda" ).autocomplete({
      source: availableTags,
      select: function( event, ui ) {
        $(' #text_busqueda ' ).val(  ui.item.label ); 
        $(' #id_Movie ').val( ui.item.id ); 
        window.location = 'Descrip_Peli.html?id=' + ui.item.id;
        return false;
     }
    })
    //
    $("#text_busqueda" ).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
      var $li = $('<li>'),
          $img = $('<img>');
try {
        var image = new Image();
        image.onload = function() {
            $img.attr({
              src: image.src,
              alt: ""
            });
        }
        image.onerror = function() {
            var err = new Image();
            err.src = '../img/not-found.png';
            $img.attr({
              src: err.src,
              alt: ""
            });
        }
        image.src = urlimg + item.icon;    
} catch (error) {
        $img.attr({
          alt: ""
        });
}
      $li.attr('data-value', item.label);
      $li.append('<a href="#">');
      $li.find('a').append($img).append(item.label);    
      return $li.appendTo(ul);
    };
   availableTags.length = 0;
   }
 });

      



function busquedapornombre() {
  var movieId = $("#id_Movie").val();
  var moviename= $(' #text_busqueda ' ).val().trim();
  if (moviename != "" && moviename.length>1) {
    if (movieId != "") {
      console.log(moviename);
      window.location = 'Descrip_Peli.html?id=' + movieId.toString();
    }else{
      try {
        moviename = document.getElementsByTagName("ul")[1].getElementsByTagName("li")[0].getElementsByTagName("a")[0].textContent;
        if (moviename != "" && moviename.length > 0) {
          fetch("https://api.themoviedb.org/3/search/movie?api_key=133e62f28b7a78182442c73f2c90e8b9&language=es&query=" + moviename)
            .then( resultado => {
              if(resultado.status == 200) {
                return resultado.text();
              } else {
                throw "Error en el servidor" 
              }
            })
            .then( resultadotext => {
              let pelicula = JSON.parse(resultadotext).results;
              var movieId = pelicula[0].id;
              window.location = 'Descrip_Peli.html?id=' + movieId.toString();
            })
            .catch( err => {
              console.log(err);
            });
          
        }else{
          toastr.error("No se encontraron resultados");
        }
      } catch (error) {
        toastr.error("UPS, error de conexión");
      }
  
    }
  
  }else{
    if (moviename.length<=1 && moviename != '') {
      toastr.error("Ingrese más caracteres");
    } else {
      toastr.error("Debe ingresar un nombre");
    }
  }
  
}
