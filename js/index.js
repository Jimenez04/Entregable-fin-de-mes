// var btn_footer =  document.getElementById("btn_ocultar_footer");
var btn_menu =  document.getElementById("btn_barra_menu");
var cuerpo =  document.getElementById("cuerpo");
var btn_movies =  document.getElementById("section_movies");

// var btn_header =  document.getElementById("btn_ocultar_header");

/* btn_footer.addEventListener('click', function(){
    agregar_clases("footer", btn_footer, "ocultardiv");
}); */

btn_menu.addEventListener('click', function(){
    agregar_clases("menu_dinamico", "", "menu_dinamico_mostrar");
}); 

btn_movies.addEventListener('click', function(){
    parcial_Cuerpo();
}); 

function parcial_Cuerpo(){
    for (let i = 0; i < 4; i++) {
        cuerpo.innerHTML = cuerpo.innerHTML +
        ` <div class="contenedor_principal_movie ">
        <a class="image_movie " href="#"><img src="../img_parcial/Demo.jfif" alt="Imagen">
             <div class="circle">
                     <i> 8.7</i>
             </div> 
        </a>
                <div class="contenedor_secundario_movie">
                    Pelicula 1
                </div>
        </div>`;
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

    
    