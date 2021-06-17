var btn_menu =  document.getElementById("btn_barra_menu");
//
var misala =  document.getElementById("miSala_JS");
var recomendaciones =  document.getElementById("recomendaciones_js");
var drama =  document.getElementById("drama_js");
var series =  document.getElementById("series_js");
//
var contenidocuerpo =  document.getElementById("cuerpo_js");
var btn_movies =  document.getElementById("section_movies");

var selector =  document.getElementById("select_Movies");

var contenedores = [misala, series, drama, recomendaciones];
var url = "https://api.themoviedb.org/3/";
var full_categorias = 'genre/movie/list';
var full_pelis = '/list/';
var key = '133e62f28b7a78182442c73f2c90e8b9';
var urlimg = 'http://image.tmdb.org/t/p/w500';

//selector.addEventListener('change', function() {RecargarCuerpo();});
//document.addEventListener("DOMContentLoaded",function() {RecargarCuerpo();});

////////////////////////////////////////////////////////////////////////
//Los siguientes dos comandos son de API,  ponga comentario en los dos de arriba
// y descomente los tres de abajo
document.addEventListener("DOMContentLoaded", RecargarCuerpo(), ObtenerGeneros());
selector.addEventListener("onselect", ObtenerPeliculas(selector.options[selector.selectedIndex].value));
 document.getElementById('select_Movies').addEventListener('change', function() {
    ObtenerPeliculas(selector.options[selector.selectedIndex].value)
  });
//////////////////////////////////////////////////////////////////////////////


//Quitar este
window.addEventListener('resize', function() { RecargarCuerpo();});
window.addEventListener("orientationchange", function() {RecargarCuerpo();}, false);

function RecargarCuerpo(){
    var contenedor_solo;
    removerhijos();
    if (screen.width > 450 || screen.availHeight < screen.availWidth) {
        i = 0;
        while(i<contenedores.length){
        parcial_Cuerpo(contenedores[i]);
        i++;
        }
    }else if(screen.width < 450 ){
        switch (selector.value) {
            case 'misala':
                contenedor_solo = misala;
                break;
            case 'series':
                contenedor_solo = series;
                break;
            case 'drama':
                contenedor_solo = drama;
                break;   
            case 'recomendaciones':
                contenedor_solo = recomendaciones;
                break;
            default:
                contenedor_solo = recomendaciones;
                // alert('Error interno');
                break;
        } 
        parcial_Cuerpo(contenedor_solo);
     }else{
          i = 0;
        while(i<contenedores.length){
        parcial_Cuerpo(contenedores[i]);
        i++; 
     }
    }
 }
function removerhijos() {
    i = 0;
    while(i<contenedores.length){
        while (contenedores[i].firstChild) {
            contenedores[i].removeChild(contenedores[i].firstChild);
        }
        i++;
    }
}
function parcial_Cuerpo(item){
    var imagenes = ["Grey's Anatomy", "Lucifer" , "Mortal Kombat", "OXÍGENO" , "Raya y EL ÚLTIMO DRAGÓN" , "Star War LA REMESA MALA" , "The Flash" , "INTERSTELAR" , "LEYENDAS" , "SIN REMORDIMIENTOS",
        "The Good Doctor", "ETERNALS" , "TOM Y JERRY" ];
    for (let i = 0; i < imagenes.length; i++) {
            var contenedor = document.createElement('div');
            contenedor.classList.add('contenedor_principal_movie');
                var etiq_a = document.createElement('div');
                etiq_a.classList.add('image_movie')
                        var etiq_img = document.createElement('img');
                        etiq_img.src = "../img_parcial/"+ imagenes[i]+ ".jpg";
                        etiq_img.alt = "Imagen";
                    var etiq_div_circle = document.createElement('a');
                    etiq_div_circle.classList.add('circle');
                        var etiq_i = document.createElement('i');
                        etiq_i.append("8.7");
                    etiq_div_circle.append(etiq_i); 
                etiq_a.append(etiq_img ); 
                var etiq_coontenedor_secun = document.createElement('div');
                etiq_coontenedor_secun.classList.add('contenedor_secundario_movie');
                    var etiq_div_title_movie = document.createElement('div');
                    etiq_div_title_movie.classList.add("title_movie","bold");
                        var etiq_text_name = document.createElement('label');
                        etiq_text_name.textContent = imagenes[i];
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
                        etiq_text_descrip.textContent = "it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";  
                    etiq_div_description_movie.append(etiq_text_descrip);
                    etiq_coontenedor_secun.append(etiq_div_title_movie, etiq_div_clasification_movie, etiq_div_duration_movie,
                    etiq_div_description_movie   );
            contenedor.append(etiq_a, etiq_div_circle, etiq_coontenedor_secun);  
        item.append(contenedor);
    }
}
    function agregar_clases(nombre_receptor, nombre_emisor, clase){
       var item_receptor =  document.getElementById(nombre_receptor);
       item_receptor.classList.toggle(clase);
       item_receptor.classList.value.includes(clase) ?
         nombre_emisor.textContent = "Mostrar" + nombre_receptor :
         nombre_emisor.textContent = "Ocultar" + nombre_receptor;
    } //para algo funciona despues...

    //API
    //No terminado...
    async function ObtenerGeneros()
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
         console.log('Categorias ', categorias);

         categorias.forEach(function (element)
         {
         let opciones = document.createElement("option")
         opciones.appendChild(document.createTextNode(element.name));
         opciones.value = element.id;
         selector.appendChild(opciones);
         var titulo = document.createElement('label');
         titulo.textContent = element.name;
         var contenedor = document.createElement('div');
         contenedor.classList.add('carousel','flex','flex_ajustable');
         contenedor.setAttribute("id", element.name + "_js");
         contenedor.setAttribute("value", element.id);
         contenidocuerpo.append(contenedor);
     })
       })
       .catch( err => {
         console.log(err);
       });
    }  
    
    async function ObtenerPeliculas(id_categoria)
    {
        removerhijos();
       await fetch(url + full_pelis + id_categoria +"?page=1&api_key="+key)
       .then( resultado => {
         if(resultado.status == 200) {
           return resultado.text();
         } else {
           throw "Error en el servidor" 
         }
       })
       .then( resultadotext => {
         let categorias = JSON.parse(resultadotext).items;
         console.log('Pelis ', categorias);

         categorias.forEach(function (element)
         {
            Cuerpo(element);
         })
       })
       .catch( err => {
         console.log(err);
       });
    }  
    

    function Cuerpo(item){
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
                misala.append(contenedor);
    }