(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorRegistroLugares', controladorRegistroLugares);

  controladorRegistroLugares.$inject = ['servicioLugares']

  function controladorRegistroLugares(servicioLugares){
    let vm = this;

    vm.nuevoLugar = {};
    
    vm.agregarNuevoLugar = (pnuevoLugar) => {
      console.log(pnuevoLugar);

      let objNuevoLugar = new Lugar (pnuevoLugar.id, pnuevoLugar.lugar);

      console.log('objeto con nuevo lugar');
     console.log(objNuevoLugar);
     servicioEntierro.agregarLugar(objNuevoLugar);

     swal("Excelente elección", "success",{ button:"aceptar",});

     vm.nuevoLugar = null;
    
    listar;
    }
     function listaLugares() {
      vm.listaLugares = servicioEntierro.obtenerLugar();
    }
  }
})(); 
