(() => {
  'use strict';
  angular
  .module('funeraria')
  .controller('controladorLogin', controladorLogin);

  controladorLogin.$inject = ['$location', 'servicioLogin', 'servicioUsuarios'];

  function controladorLogin($location, servicioLogin, servicioUsuarios){
    let vm = this;
    vm.listaUsuarios = servicioUsuarios.getUsuarios(); 
    vm.usuario = {};
    
    
    vm.inicarSesion = (pCredenciales) => {
      let inicioCorrecto = servicioLogin.inicioSesion(pCredenciales);
      /*let listaUsuarios = vm.listaUsuarios;
      for(let i =0; i< listaUsuarios; i++){
        if(listaUsuarios[i] == pCredenciales.nombreUsuario){
          let user = vm.listaUsuarios[i].estado;
          console.log(user);
        } 
      }*/
      
      if(inicioCorrecto == true /* && user == 'activo'*/){
        swal("Datos correctos", "Sesion iniciada correctamente", "success");
          if(pCredenciales.nombreUsuario == 'admin'){
            $location.path('/admin');
            console.log(user);

          }
          else{
            $location.path('/muertos');
          }   
      }
      else{
        swal("Datos erroneos", "asfasf", "error");
      }
    } 
  }
})();