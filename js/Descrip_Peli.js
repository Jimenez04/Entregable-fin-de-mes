var body2 =  document.getElementById("body2");
var back =  document.getElementById("back");

document.addEventListener("DOMContentLoaded", function () {
   /*  var contenedor = document.createElement('div');
    contenedor.classList.add('carousel','flex','flex_ajustable');
    contenedor.setAttribute("id", element.name + "_js");
    contenedor.setAttribute("value", element.id);
    contenidocuerpo.append(contenedor); */

   /*  var contenidocuerpo =  document.getElementById("cuerpo_js"); */
    var titulo = document.createElement('label');
    titulo.textContent = "Para los Playitos";
    body2.append(titulo);   
}
)

back.addEventListener("click", function () { 
    history.back();
});