(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorRegistroFiestas', controladorRegistroFiestas);

  controladorRegistroFiestas.$inject = ['$stateParams', '$state', '$scope','servicioUsuarios','servicioAnimadores']

  function controladorRegistroFiestas($stateParams, $state, $scope, servicioUsuarios, servicioAnimadores) {
    let vm = this;

    // aqui validamos que el paramatero exista, en caso de que no exista nos redijirá al estado anterior
    if (!$stateParams.objMuertoTemp) {
      $state.go('registrarMuertos');
    }

    let objSinFormatoMuerto = JSON.parse($stateParams.objMuertoTemp);

    let objMuerto = new Muerto(objSinFormatoMuerto.apodo, objSinFormatoMuerto.edad, objSinFormatoMuerto.genero, objSinFormatoMuerto.tamanno, objSinFormatoMuerto.fiesta);
    
    listaFiestas(objMuerto);
    listarAnimador();

    // Default Values
    vm.nuevaFiesta = {};
    vm.nuevaFiesta.duracion = 0;
    vm.costoTotal = 0;

    // Valores para el calculo de costos
    vm.costoPorHora = 65;

    //Watchers
    $scope.$watch('vm.nuevaFiesta.duracion', calcularCostos);
    $scope.$watchCollection('vm.nuevaFiesta.animador', calcularCostos);
    $scope.$watch('vm.descuento', calcularCostos);
    
    vm.registrarFiesta = (nuevaFiesta) => {

      let objFiesta = new Fiestas(nuevaFiesta.fecha, nuevaFiesta.duracion, vm.costoTotal, nuevaFiesta.animador)

      let objMuerto2 = servicioUsuarios.addFiesta(objMuerto, objFiesta);
      objMuerto = new Muerto(objMuerto2.apodo, objMuerto2.edad, objMuerto2.genero, objMuerto2.tamanno, objMuerto2.fiesta);

      listaFiestas(objMuerto);

      swal("Registro exitoso", "Se ha registrado correctamente la Fiesta", "success", {
        button: "Aceptar",
      });

    }

    vm.volver = () => {
      $state.go('muertos');
    }

    function listaFiestas(objMuerto) {

      vm.listaFiestas = objMuerto.obtenerFiesta();

    }

     function listarAnimador() {
     vm.listaAnimador = servicioAnimadores.obtenerAnimador();
     }

     function costoAnimadores(nuevaFiesta){
      let sumatoria = 0; 
      if (nuevaFiesta.animador){
        nuevaFiesta.animador.forEach(animador => {
          sumatoria += animador.costo;
        });
      }
      return sumatoria;
     }

     function costoTotal(nuevaFiesta){
      let descuento = 1;
      if (vm.descuento){
        descuento = 0.94;
      }
      vm.costoTotal = (vm.costoPorHora * nuevaFiesta.duracion + costoAnimadores(nuevaFiesta)) * descuento;
     }

     function calcularCostos(){
      costoTotal(vm.nuevaFiesta);
     }
  }
})();