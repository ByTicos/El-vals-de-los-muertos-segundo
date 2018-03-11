(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorAdministrador', controladorAdministrador);

  controladorAdministrador.$inject = ['servicioUsuarios','servicioAdministrador','servicioRetoques', 'servicioAnimadores']

  function controladorAdministrador(servicioUsuarios, servicioAdministrador, servicioRetoques, servicioAnimadores){
    let vm = this;

    vm.listaUsuarios = servicioUsuarios.getUsuarios();

    vm.listaMuertos = servicioUsuarios.getAllMuertos();

    vm.nuevoRetoque = {};
    vm.listaRetoques = servicioRetoques.obtenerRetoques();

    

    vm.eliminarUsuario = (pCedula) => {
      console.log(pCedula);
      servicioUsuarios.eliminarUsuario(pCedula);
      vm.listaUsuarios = servicioUsuarios.getUsuarios();
    }
    vm.activarUsuario = (pCedula) => {
      console.log(pCedula);
      servicioUsuarios.activarUsuario(pCedula);
      vm.listaUsuarios = servicioUsuarios.getUsuarios();
    }
    
    vm.agregarNuevoRetoque = (pnuevoRetoque) => {
      console.log(pnuevoRetoque);

      let objNuevoRetoque = new Retoques(pnuevoRetoque.id, pnuevoRetoque.nombre, pnuevoRetoque.costo);

      console.log('objeto con usuario');
      console.log(objNuevoRetoque);

      let valido = servicioRetoques.agregarRetoques(objNuevoRetoque);

      if(valido == true) {
        swal("Registro exitoso", "El retoque ha sido registrado correctamente", "success", {
          button: "Aceptar",
        });
        listarRetoques();
        vm.nuevoRetoque = null;
      }else{
        swal("Registro no exitoso", "El retoque ha sido registrado correctamente", "error", {
          button: "Aceptar",
        });
      }

    }

    function listarRetoques() {
      vm.listaRetoques = servicioRetoques.obtenerRetoques();
    }
    
    //Registro de Animadores

    vm.nuevoAnimador = {};
    //vm.listaAnimador = listaAnimador();

    listarAnimador();
    // Función que es llamda desde el html para registra un nuevo usuario
    vm.registrarAnimador = (pnuevoAnimador) => {

      console.log(pnuevoAnimador);

      // Tomamos el objeto sin formato y lo comvertimos en una instancia de la clase cliente
      let objNuevoAnimador = new Animadores(pnuevoAnimador.id, pnuevoAnimador.apodo, pnuevoAnimador.costo);

     
      console.log('objeto con usuario');
      console.log(objNuevoAnimador);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioAnimadores.agregarAnimador(objNuevoAnimador);

      // Retroalimentación Visual para los usuarios
      swal("Registro exitoso", "El Animador ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoAnimador = null;
     // listarAnimador();
    }

    function listarAnimador() {
      vm.listaAnimador = servicioAnimadores.obtenerAnimador();
    }
    
  }
})();