
 var availableTags = [];
 $("#text_busqueda").keyup(function () {
   if ($("#text_busqueda").val().length>2) {
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
                availableTags.push({"label":element.title, "value":element.id}
                  );
           });
     })
     .catch( err => {
       console.log(err);
     });
     $("#text_busqueda" ).autocomplete({source: availableTags, 
     select: function( event, ui ) {
       $(' #text_busqueda ' ).val(  ui.item.label ); 
       $(' #id_Movie ').val( ui.item.value ); 
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
  var prodId = $("#id_Movie").val();
  window.location = 'Descrip_Peli.html?id=' + prodId.toString();
  
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