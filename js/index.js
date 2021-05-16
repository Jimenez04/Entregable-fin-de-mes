// var btn_footer =  document.getElementById("btn_ocultar_footer");
var btn_menu =  document.getElementById("btn_barra_menu");
var cuerpo =  document.getElementById("cuerpo");
var btn_movies =  document.getElementById("section_movies");

$(document).ready(function () {
    $(document).on('mouseup', function(e){
      const container = $("#btn_barra_menu");
      const container2 = $("#lista");
      if(!container.is(e.target) && container.has(e.target).length === 0 
      && !container2.is(e.target) && container2.has(e.target).length === 0  ) {
        $('#menu_dinamico').hide('slide');
      }
    });
  
    $('#btn_barra_menu').on('click', function () {
    //   $('#menu_dinamico');
    $("#menu_dinamico").slideToggle("menu_dinamico_mostrar");
    });
  });
  
// var btn_header =  document.getElementById("btn_ocultar_header");

/* btn_footer.addEventListener('click', function(){
    agregar_clases("footer", btn_footer, "ocultardiv");
}); */

/* btn_menu.addEventListener('click', function(){
    agregar_clases("menu_dinamico", "", "menu_dinamico_mostrar");
}); 
 */
btn_movies.addEventListener('click', function(){
    parcial_Cuerpo();
}); 

function parcial_Cuerpo(){
    for (let i = 0; i < 4; i++) {
       /*  cuerpo.innerHTML = cuerpo.innerHTML +
            `<div class="contenedor_principal_movie ">
                <a class="image_movie " href="#">   <img src="../img_parcial/Demo.jfif" alt="Imagen">
                    <div class="circle">
                            <i>8.7</i>
                    </div> 
                </a>
                    <div class="contenedor_secundario_movie">
                            <div class="title_movie bold flex flex_ajustable">
                                <label for="">Captain America 3</label>
                            </div>

                            <div class="classification_movie">
                                <label for="">Captain America 3</label>
                            </div>
                        
                            <div class="duration_movie ">
                                <label for="">120 min</label>
                            </div>
                        
                            <div class="description_movie flex ">
                                <textarea    for="" readonly> hjsajhsahjsahjsahjsajhsajhsajhsahjsajhsahjsahjsahjsahjsahjsahjsa
                                </textarea>
                            </div>
                    </div>
            </div>`; */
            var contenedor = document.createElement('div');
            contenedor.classList.add('contenedor_principal_movie');
                var etiq_a = document.createElement('a');
                etiq_a.classList.add('image_movie')
                        var etiq_img = document.createElement('img');
                        etiq_img.src = "../img_parcial/Demo.jfif";
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
                    etiq_div_title_movie.classList.add("title_movie","bold","flex", "flex_ajustable");
                        var etiq_text_name = document.createElement('label');
                        etiq_text_name.textContent = "Captain America 3";
                    etiq_div_title_movie.append(etiq_text_name);

                    var etiq_div_clasification_movie = document.createElement('div');
                    etiq_div_clasification_movie.classList.add("classification_movie");
                        var etiq_text_clasifi = document.createElement('label');
                        etiq_text_clasifi.textContent = "Captain America 3";        
                    etiq_div_clasification_movie.append(etiq_text_clasifi);

                    var etiq_div_duration_movie = document.createElement('div');
                    etiq_div_duration_movie.classList.add("duration_movie");
                        var etiq_text_duration = document.createElement('label');
                        etiq_text_duration.append("120");   
                    etiq_div_duration_movie.append(etiq_text_duration);

                    var etiq_div_description_movie = document.createElement('div');
                    etiq_div_description_movie.classList.add("description_movie","flex");
                        var etiq_text_descrip = document.createElement('p');
                        /* etiq_text_name.for= "<readonly>" */
                        etiq_text_descrip.textContent = "sddsdsdsdsds";  
                    etiq_div_description_movie.append(etiq_text_descrip);

                    etiq_coontenedor_secun.append(etiq_div_title_movie, etiq_div_clasification_movie, etiq_div_duration_movie,
                    etiq_div_description_movie   );
                
            contenedor.append(etiq_a, etiq_div_circle, etiq_coontenedor_secun);  
            
               


        cuerpo.append(contenedor);
    }
}

/* btn_header.addEventListener('click', function(){
    agregar_clases("header", btn_header, "ocultardiv");

}); */

    function agregar_clases(nombre_receptor, nombre_emisor, clase){
       var item_receptor =  document.getElementById(nombre_receptor);
       item_receptor.classList.toggle(clase);
       item_receptor.classList.value.includes(clase) ?
         nombre_emisor.textContent = "Mostrar" + nombre_receptor :
         nombre_emisor.textContent = "Ocultar" + nombre_receptor;
    }

    
    