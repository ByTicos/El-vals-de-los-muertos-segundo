(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorRegistroRetoques', controladorRegistroRetoques);

  controladorRegistroRetoques.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'servicioRetoques']

  function controladorRegistroRetoques($stateParams, $state, servicioUsuarios, servicioRetoques){
    let vm = this;

    // aqui validamos que el paramatero exista, en caso de que no exista nos redijirá al estado anterior
     if(!$stateParams.objMuertoTemp){
          $state.go('registrarMuertos');
        }
    console.log($stateParams);
    let objSinFormatoMuerto = $stateParams.objMuertoTemp;

    let objMuerto = new Muerto (objSinFormatoMuerto.apodo, objSinFormatoMuerto.edad, objSinFormatoMuerto.genero, objSinFormatoMuerto.tamanno, objSinFormatoMuerto.fiesta);

    console.log('objetosinformato',objSinFormatoMuerto);


    vm.listaRetoques = servicioRetoques.obtenerRetoques();

    //listaRetoques(objMuerto);

    vm.agregarRetoqueaMuerto = (pRetoque) =>{
      console.log(pRetoque);

      let objR = angular.fromJson(pRetoque);

      let objNuevosRetoques = new Retoques(objR.id,objR.nombre,objR.costo);

     console.log('objeto con nuevo retoque');
     console.log(objNuevosRetoques);

     objMuerto =  servicioUsuarios.addRetoques(objMuerto, objNuevosRetoques);
     
      console.log(localStorage);

      
      //listaRetoques(objMuerto);

      swal("Registro exitoso", "Se ha agregado correctamente el retoque", "success", {
        button: "Aceptar",
      });

      vm.volver = () => {
        $state.go('registrarMuertos');
      }
  
       function listaRetoques(objMuerto){
         console.log(objMuerto);
       vm.listaRetoques = objMuerto.getRetoques();
       console.log(vm.listaRetoques)
      }

  }
} 
})();
