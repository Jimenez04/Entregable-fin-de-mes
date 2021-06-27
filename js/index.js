var btn_menu =  document.getElementById("btn_barra_menu");
var contenidocuerpo =  document.getElementById("cuerpo_js");
var btn_movies =  document.getElementById("section_movies");

var selector =  document.getElementById("select_Movies");

var contenedores = ["Popular_js"] ;
var id_contenedores = [0] ;

var url = "https://api.themoviedb.org/3/";
var full_categorias = 'genre/movie/list';
var full_pelis = 'discover/movie';
var key = '133e62f28b7a78182442c73f2c90e8b9';
var urlimg = 'http://image.tmdb.org/t/p/w500';
var pelis_popular = "movie/popular";
// 
document.addEventListener("DOMContentLoaded", function(){
    RecargarCuerpo();
}
 );
// selector.addEventListener("onselect", ObtenerPeliculasPorGenero(selector.options[selector.selectedIndex].value, selector.options[selector.selectedIndex].text+"_js"));
 document.getElementById('select_Movies').addEventListener('change', function() {
    removerhijos();
    ObtenerPeliculasPorGenero(selector.options[selector.selectedIndex].value, selector.options[selector.selectedIndex].text+"_js")
  });
//////////////////////////////////////////////////////////////////////////////


//Quitar este
window.addEventListener('resize', function() { RecargarCuerpo();});
window.addEventListener("orientationchange", function() {RecargarCuerpo();}, false);

async function RecargarCuerpo(){
       removerhijos();
       await ObtenerGenerosDePeliculas();
        if (screen.width > 450 || screen.availHeight < screen.availWidth) {
        ObtenerTodoConCategoria();
        }else if(screen.width < 450 ){
        removerhijos();
        ObtenerPeliculasPorGenero(selector.options[selector.selectedIndex].value, selector.options[selector.selectedIndex].text+"_js");
        }
    }

   async function ObtenerTodoConCategoria(){
        Array.from(document.querySelector("#select_Movies").options).forEach(function(option_element) {
            ObtenerPeliculasPorGenero(option_element.value, option_element.text+"_js");
            i++;
        });
    }
    
    async function ObtenerGenerosDePeliculas()
    {
       await fetch(url + full_categorias + "?api_key="+key+"&language=es")
       .then( resultado => {
         if(resultado.status == 200) {
           return resultado.text();
         } else {
           throw "Error en el servidor" 
         }
       })
       .then( resultadotext => {
         let categorias = JSON.parse(resultadotext).genres;
         categorias.forEach(function (element)
         {
         let opciones = document.createElement("option")
         opciones.appendChild(document.createTextNode(element.name));
         opciones.value = element.id;
         selector.appendChild(opciones);
         var titulo = document.createElement('label');
         titulo.textContent = element.name;
         titulo.classList.add('bold','flex');
         contenidocuerpo.append(titulo);
         var contenedor = document.createElement('div');
         contenedor.classList.add('carousel','flex','flex_ajustable');
         contenedor.setAttribute("id", element.name + "_js");
         contenedor.setAttribute("value", element.id);
         var salto = document.createElement('hr');
         contenidocuerpo.append(contenedor,salto);
         contenedores.push(element.name + "_js");
         id_contenedores.push(element.id);
     })
       })
       .catch( err => {
         console.log(err);
       });
    }  
    
    async function ObtenerPeliculasPorGenero(id_categoria, contenedor)
    {
        var enlace; 
        if(id_categoria!=0){
            enlace = url + full_pelis +"?api_key="+key + "&with_genres="+ id_categoria;
        }else {
            enlace = url + pelis_popular +"?api_key="+key + "&language=es&page=1";
        }
       await fetch(enlace)
       .then( resultado => {
         if(resultado.status == 200) {
           return resultado.text();
         } else {
           throw "Error en el servidor" 
         }
       })
       .then( resultadotext => {
         let categorias = JSON.parse(resultadotext).results;
            categorias.forEach(function (element)
            {
               Cuerpo(element,contenedor);
            })
       })
       .catch( err => {
         console.log(err);
       });
    }  
    

    function Cuerpo(item,div_contenedor){
        var cuerpohtml =  document.getElementById(div_contenedor);
        var contenedor = document.createElement('div');
        contenedor.classList.add('contenedor_principal_movie');
            var etiq_a = document.createElement('div');
            etiq_a.classList.add('image_movie')
                    var etiq_img = document.createElement('img');
                   etiq_img.src = urlimg + item.poster_path;
                    etiq_img.alt = "Error al cargar";
                var etiq_div_circle = document.createElement('a');
                etiq_div_circle.classList.add('circle');
                    var etiq_i = document.createElement('i');
                    etiq_i.append(item.vote_average);
                etiq_div_circle.append(etiq_i); 
            etiq_a.append(etiq_img ); 
            var etiq_coontenedor_secun = document.createElement('div');
            etiq_coontenedor_secun.classList.add('contenedor_secundario_movie');
                var etiq_div_title_movie = document.createElement('div');
                etiq_div_title_movie.classList.add("title_movie","bold");
                    var etiq_text_name = document.createElement('label');
                    etiq_text_name.textContent = item.title;
                etiq_div_title_movie.append(etiq_text_name);
                var etiq_div_clasification_movie = document.createElement('div');
                etiq_div_clasification_movie.classList.add("classification_movie");
                    var etiq_text_clasifi = document.createElement('label');
                    etiq_text_clasifi.textContent = "Acción, Comedia, Drama";        
                etiq_div_clasification_movie.append(etiq_text_clasifi);
                var etiq_div_duration_movie = document.createElement('div');
                etiq_div_duration_movie.classList.add("duration_movie");
                    var etiq_text_duration = document.createElement('label');
                    etiq_text_duration.append("120");   
                etiq_div_duration_movie.append(etiq_text_duration);
                var etiq_div_description_movie = document.createElement('div');
                etiq_div_description_movie.classList.add("description_movie");
                    var etiq_text_descrip = document.createElement('p');
                    etiq_text_descrip.textContent = item.overview;
                etiq_div_description_movie.append(etiq_text_descrip);
                etiq_coontenedor_secun.append(etiq_div_title_movie, etiq_div_clasification_movie, etiq_div_duration_movie,
                etiq_div_description_movie);
        contenedor.append(etiq_a, etiq_div_circle, etiq_coontenedor_secun);  
        cuerpohtml.append(contenedor);
    }

    function removerhijos() {
        i = 0;
        while(i<contenedores.length){
            var cuerpohtml =  document.getElementById(contenedores[i]);
            try {
                while (cuerpohtml.firstChild) {
                    cuerpohtml.removeChild(cuerpohtml.firstChild);
                }
            } catch (error) {
                
            }
            i++;
        }
    }