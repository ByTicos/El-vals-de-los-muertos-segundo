(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorRegistroEntierro', controladorRegistroEntierro);

  controladorRegistroEntierro.$inject = ['$stateParams','$state','servicioEntierros'];

  function controladorRegistroEntierro($stateParams,$state,servicioEntierros) {
    let vm = this;


    

    vm.nuevoEntierro = {};

    listarEntierro();

    
    vm.registrarMuerto = (pnuevoMuerto) =>{
     

     let objNuevoMuerto = new Muerto (pnuevoMuerto.apodo, pnuevoMuerto.edad, pnuevoMuerto.genero, pnuevoMuerto.tamanno);

     servicioUsuarios.addMuerto(objNuevoMuerto);


     swal("Registro exitoso", "Se ha registrado correctamente el difunto", "success", {
        button: "Aceptar",
      });
     listarMuertos ();

     vm.nuevoMuerto = null;
    
    }
    function listarMuertos(){
    vm.listaMuertos = servicioUsuarios.getMuerto();
      
    }
     
  }
})(); 