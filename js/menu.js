$(document).ready(function () {
    $(document).on('mouseup', function(e){
      const container = $("#btn_barra_menu");
      const container2 = $("#lista");
      if(!container.is(e.target) && container.has(e.target).length === 0 
      && !container2.is(e.target) && container2.has(e.target).length === 0 && $(document).width()<450) {
        $('#menu_dinamico').hide('slide');
      }
    });
    $('#btn_barra_menu').on('click', function () {
    $("#menu_dinamico").slideToggle("menu_dinamico_mostrar");
    });
  });
