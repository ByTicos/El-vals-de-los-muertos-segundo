(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorRegistroFiestas', controladorRegistroFiestas);

  controladorRegistroFiestas.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorRegistroFiestas($stateParams, $state, servicioUsuarios) {
    let vm = this;


    // aqui validamos que el paramatero exista, en caso de que no exista nos redijirá al estado anterior
    if (!$stateParams.objMuertoTemp) {
      $state.go('registrarMuertos');
    }



    let objSinFormatoMuerto = JSON.parse($stateParams.objMuertoTemp);

    let objMuerto = new Muerto(objSinFormatoMuerto.apodo, objSinFormatoMuerto.edad, objSinFormatoMuerto.genero, objSinFormatoMuerto.tamanno, objSinFormatoMuerto.fiesta);


    //vm.infoMuerto = objMuerto.getInfoMuerto();

    listaFiestas(objMuerto);
    // listarAnimador();

    vm.nuevaFiesta = {};
    vm.nuevaFiesta.duracion = 2;
    vm.nuevaFiesta.fecha = new Date("October 13, 2014 11:13:00");

    // vm.listarFiestas = Animadores.obtenerFiesta(objMuerto);

    vm.registrarFiesta = (nuevaFiesta) => {

      let objFiesta = new Fiestas(nuevaFiesta.fecha, nuevaFiesta.duracion, nuevaFiesta.costo, nuevaFiesta.animadores)



      let objMuerto2 = servicioUsuarios.addFiesta(objMuerto, objFiesta);
      objMuerto = new Muerto(objMuerto2.apodo, objMuerto2.edad, objMuerto2.genero, objMuerto2.tamanno, objMuerto2.fiesta);
      // servicioUsuarios.addFiesta(objMuerto, objFiesta);


      // objMuerto = objMuerto.obtenerInfoMuerto();

      listaFiestas(objMuerto);

      swal("Registro exitoso", "Se ha registrado correctamente la Fiesta", "success", {
        button: "Aceptar",
      });

      //vm.nuevaFiesta = null;
    }

    vm.volver = () => {
      $state.go('muertos');
    }

    function listaFiestas(objMuerto) {

      vm.listaFiestas = objMuerto.obtenerFiesta();

    }

    // function listarAnimador() {
    //   vm.listaAnimador = servicioAnimadores.obtenerAnimador();
    // }

    // vm.checkAll = function () {
    //   vm.nuevaFiesta.animadores = vm.nuevaFiesta.animadores.map(function (animador) {
    //     return animador;
    //   });
    // };


  }
})();