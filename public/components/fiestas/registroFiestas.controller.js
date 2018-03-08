(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorRegistroFiestas', controladorRegistroFiestas);

  controladorRegistroFiestas.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorRegistroFiestas($stateParams, $state, servicioUsuarios){
    let vm = this;

    // aqui validamos que el paramatero exista, en caso de que no exista nos redijirá al estado anterior
    if(!$stateParams.objMuertoTemp){
      $state.go('muertos');
    }
    console.log($stateParams);
    let objSinFormatoMuerto = $stateParams.objMuertoTemp;

    let objMuerto = new Muerto (objSinFormatoMuerto.apodo, objSinFormatoMuerto.edad, objSinFormatoMuerto.genero, objSinFormatoMuerto.tamanno, objSinFormatoMuerto.fiesta);

    console.log('objetosinformato',objSinFormatoMuerto);

    //vm.infoMuerto = objMuerto.getInfoMuerto();

     listaFiestas(objMuerto);

    //vm.nuevaFiesta = {};
    

    // vm.listarFiestas = Animadores.obtenerFiesta(objMuerto);

    vm.registrarFiesta = (nuevaFiesta) => {

      let objFiesta = new Fiestas(nuevaFiesta.fecha, nuevaFiesta.duracion, nuevaFiesta.costo)

      objMuerto =  servicioUsuarios.addFiesta(objMuerto, objFiesta);
     
      console.log(localStorage);

      //objMuerto = objMuerto.obtenerInfoMuerto();

      listaFiestas(objMuerto);

      swal("Registro exitoso", "Se ha registrado correctamente la Fiesta", "success", {
        button: "Aceptar",
      });

      //vm.nuevaFiesta = null;
    }

    vm.volver = () => {
      $state.go('muertos');
    }

     function listaFiestas(objMuerto){
       console.log(objMuerto);
     vm.listaFiestas = objMuerto.obtenerFiesta();
     console.log(vm.listaFiestas)
    }

    
  }
})();
