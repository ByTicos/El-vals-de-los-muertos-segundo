(() => {
  'use strict';
  angular
  .module('funeraria')
  .service('servicioRetoques', servicioRetoques);

  servicioRetoques.$inject = ['$log', '$http'];

  function servicioRetoques ($log, $http){

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
      agregarRetoques: _agregarRetoques,
      obtenerRetoques: _obtenerRetoques
    };
    return publicAPI;

    function _agregarRetoques(pnuevoRetoque) {
        let listaRetoques = _obtenerRetoques();
        let respuesta = true;
        listaRetoques.push(pnuevoRetoque);

        asyncLocalStorage.setItem('retoquesLS', listaRetoques).then((response) =>{
          respuesta = response;
        });
        return respuesta;
    }

    function _obtenerRetoques() {
      let listaRetoques = [];
      let listaRetoquesLocal = JSON.parse(localStorage.getItem("retoquesLS"));

      if(listaRetoquesLocal == null){
        listaRetoques = [];
      }else {
        listaRetoquesLocal.forEach(obj => {

          let objRetoque = new Retoques(obj.id, obj.nombre, obj.costo);

          listaRetoques.push(objRetoque);
        });
      }
      return listaRetoques;
    }
  }
})();
