/**
 * @param String name
 * @return String
 */

var body2 = document.getElementById("body2");
var back = document.getElementById("back");

// var url  = document.location.href = 'Descrip_Peli.html/id=section_movies';
var prodId = getParameterByName('id');

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
    console.log("El id es: " + prodId);
    alert("El ID es: " + prodId);
}
)

back.addEventListener("click", function () {
    history.back();
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function goBack() {
    window.history.back()
}