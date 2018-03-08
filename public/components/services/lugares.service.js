(() => {
  'use strict';
  angular
  .module('funeraria')
  .service('servicioLugares', servicioLugares);

  servicioLugares.$inject = ['$log', '$http'];

  function servicioLugares ($log, $http){

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
      agregarLugares: _agregarLugares,
      obtenerLugares: _obtenerLugares
    };
    return publicAPI;

    function _agregarLugares(pnuevoLugar) {
        let listaLugares = _obtenerLugares();
        let respuesta = true;
        listaLugares.push(pnuevoLugar);

        asyncLocalStorage.setItem('lugaresLS', listaLugares).then((response) =>{
          respuesta = response;
        });
        return respuesta;
    }

    function _obtenerLugares() {
      let listaLugares = [];
      let listaLugaresLocal = JSON.parse(localStorage.getItem("lugaresLS"));

      if(listaLugaresLocal == null){
        listaLugares = [];
      }else {
        listaLugaresLocal.forEach(obj => {

          let objLugar = new Lugares(obj.id, obj.lugar);

          listaLugares.push(objLugar);
        });
      }
      return listaLugares;
    }
  }
})();
