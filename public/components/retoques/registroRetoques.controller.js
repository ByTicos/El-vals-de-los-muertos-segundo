(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorRegistroRetoques', controladorRegistroRetoques);

  controladorRegistroRetoques.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'servicioRetoques']

  function controladorRegistroRetoques($stateParams, $state, servicioUsuarios, servicioRetoques){
    let vm = this;
    vm.listaRetoques = servicioRetoques.obtenerRetoques();

    vm.agregarRetoqueaMuerto = (pRetoque) =>{
      console.log(pRetoque);

      let objR = angular.fromJson(pRetoque);

      let objNuevosRetoques = new Retoques(objR.id,objR.nombre,objR.costo);

     console.log('objeto con nuevo retoque');
     console.log(objNuevosRetoques);
  }

}
  
})();
