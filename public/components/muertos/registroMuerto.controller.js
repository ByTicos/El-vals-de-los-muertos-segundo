(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorRegistroMuerto', controladorRegistroMuerto);

  controladorRegistroMuerto.$inject = ['$stateParams','$state','servicioUsuarios'];

  function controladorRegistroMuerto($stateParams, $state, servicioUsuarios) {

    let vm = this;
    vm.nuevoMuerto = {};
    

    listarMuertos();

   

    vm.agregarnuevoMuerto = (pnuevoMuerto) =>{
     let objNuevoMuerto = new Muerto (pnuevoMuerto.apodo, pnuevoMuerto.edad, pnuevoMuerto.genero, pnuevoMuerto.tamanno,pnuevoMuerto.fiesta);

     servicioUsuarios.addMuerto(objNuevoMuerto);


     swal("Registro exitoso", "Se ha registrado correctamente el difunto", "success", {
        button: "Aceptar",
      });
     listarMuertos ();

     vm.nuevoMuerto = null;
    
    }
      vm.agregarRetoqueaMuerto = (pMuerto) => {
      console.log(pMuerto);

      $state.go('registroRetoques', {objMuertoTemp: JSON.stringify(pMuerto)})
    }

    vm.agregarFiestaaMuerto = (pMuerto) => {
      $state.go('registroFiestas', {objMuertoTemp: JSON.stringify(pMuerto)});
    }
     function listarMuertos() {
      vm.listaMuertos = servicioUsuarios.getMuerto();
    }
  }
})(); 