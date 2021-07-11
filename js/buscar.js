
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
                availableTags.push({"label":element.title, "value":element.title, "id":element.id}
                  );
           });
     })
     .catch( err => {
       console.log(err);
     });
     $("#text_busqueda" ).autocomplete({source: availableTags, 
     select: function( event, ui ) {
       $(' #text_busqueda ' ).val(  ui.item.label ); 
       $(' #id_Movie ').val( ui.item.id ); 
       return false;
    } ,

  messages: {
      noResults: '',
      results: function() {}
  }
    });
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
        console.log(document.getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[0]
        .getElementsByTagName("div")[0].textContent);
        moviename = document.getElementsByTagName("ul")[1].getElementsByTagName("li")[0].getElementsByTagName("div")[0].textContent;
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
              console.log(moviename);
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





// $('#text_busqueda').autocomplete({
//   source : function(requete, reponse){
//       $.ajax({
//           url : "https://api.themoviedb.org/3/search/movie?api_key=133e62f28b7a78182442c73f2c90e8b9&language=es&",
//           dataType : 'json', 
//           data : {query : $('#text_busqueda').val(), maxRows : 15},
//           success : function(donnee){
//               reponse($.map(donnee, function(objet){
//                 console.log(objet);
//                   return {
//                       label: objet.title,
//                       value: objet.id
//                       };
//               }));
//           }
//       });
//   },

//   minLength: 3,
//   delay:500,

//   select: function( event, ui ) {
//        $(' #text_busqueda ' ).val(  ui.item.label ); 
//        $(' #id_personne ').val( ui.item.value ); 
//        return false;
//     } ,

//   messages: {
//       noResults: '',
//       results: function() {}
//   }


// }); 