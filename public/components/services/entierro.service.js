(() => {
  'use strict';
  angular
  .module('funeraria')
  .service('servicioEntierro', servicioEntierro);

  servicioEntierro.$inject = ['$log','$http'];

  function servicioEntierro($log, $http){

    const asyncLocalStorage = {
      setItem: function (key, value) {
          return Promise.resolve().then(() => {
              let response = true;
              localStorage.setItem(key, JSON.stringify(value));
              return response
          });
      }
    };

    let publicAPI = {
      addEntierro : _addEntierro,
      getEntierro : _getEntierro
    }
    return publicAPI;

     // Funcion que almacena en el localStorage todos los usuarios
     function _addEntierro(pNuevoEntierro){
      let listaEntierros = _getEntierro();
      let respuesta = true;
      listaEntierros.push(pNuevoEntierro);

      asyncLocalStorage.setItem('entierrosLS', listaEntierros).then((response) =>{
      });
      return respuesta;
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getEntierro(){
      let listaEntierros = [];
      let listaEntierrosLocal = JSON.parse(localStorage.getItem("entierrosLS"));

      if(listaEntierrosLocal == null){
        listaEntierros = [];
      }else{
        listaEntierrosLocal.forEach(obj => {
          
          let objUsuarios = new Cliente(obj.foto, obj.nombre, obj.apellido, obj.cedula, obj.provincia, obj.canton, obj.distrito, obj.ubicacion, obj.fechaNacimiento, obj.edad, obj.genero, obj.nombreUsuario, obj.contrasenna);

          listaEntierros.push(objUsuarios);
        })
      }

      return listaEntierros;
    }
  }
})();
