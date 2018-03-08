(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorUsuarios', controladorUsuarios);

  controladorUsuarios.$inject = ['$location','servicioUsuarios'];

  function controladorUsuarios($location, servicioUsuarios){
    let vm = this;

    vm.nuevoUsuario = {};
    vm.listaUsuarios = listarUsuarios();

    listarUsuarios();
    // Función que es llamda desde el html para registra un nuevo usuario
    vm.registrarUsuario = (pNuevoUsuario) => {
      console.log(pNuevoUsuario);
      

      // Tomamos el objeto sin formato y lo comvertimos en una instancia de la clase cliente
      let objNuevoUsuario = new Cliente(pNuevoUsuario.foto, pNuevoUsuario.nombre, pNuevoUsuario.apellido, pNuevoUsuario.cedula, pNuevoUsuario.provincia,  pNuevoUsuario.canton,  pNuevoUsuario.distrito,  pNuevoUsuario.ubicacion,  pNuevoUsuario.fechaNacimiento,  pNuevoUsuario.edad,  pNuevoUsuario.genero,  pNuevoUsuario.nombreUsuario,  pNuevoUsuario.contrasenna,  pNuevoUsuario.confirmarContrasenna);

     
      console.log('objeto con usuario');
      console.log(objNuevoUsuario);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorag
      let registro = servicioUsuarios.addUsuario(objNuevoUsuario);

      // Retroalimentación Visual para los usuarios
      if(registro == true){
        swal("Registro exitoso", "El usuario ha sido registrado correctamente", "success", {
          button: "Aceptar",
        });
        $location.path('/logIn');
      }
      else{
        swal("Registro fallido", "Ha ocurrido un error, intente nuevamente", "error", {
          button: "Aceptar",
        });
      }
      

      // Se limpia el formulario
      vm.nuevoUsuario = null;
      listarUsuarios();
    }

    vm.verUsuario = (pUsuario) => {
      console.log(pUsuario);
    }
    
    function listarUsuarios() {
      vm.listaUsuarios = servicioUsuarios.getUsuarios();
    }


  }
})();