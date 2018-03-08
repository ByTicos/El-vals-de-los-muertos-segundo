(() => {
  'use strict';
  angular
  .module('funeraria')
  .service('servicioAnimadores', servicioAnimadores);

  servicioAnimadores.$inject = ['$log', '$http'];

  function servicioAnimadores ($log, $http){

    let publicAPI = {
      agregarAnimador: _agregarAnimador,
      obtenerAnimador: _obtenerAnimador
    }
    
    return publicAPI;

    function _agregarAnimador(pnuevoAnimador) {
        let listaAnimador = _obtenerAnimador();
        listaAnimador.push(pnuevoAnimador);
        localStorage.setItem('animadorLS', JSON.stringify(listaAnimador));
    }
    

    function _obtenerAnimador() {
      let listaAnimador = [];
      let listaAnimadorLocal = JSON.parse(localStorage.getItem("animadorLS"));

      if(listaAnimadorLocal == null){
        listaAnimador = [];
      }else {
        listaAnimadorLocal.forEach(obj => {

          let objAnimadores = new Animadores(obj.id, obj.apodo, obj.costo);

          listaAnimador.push(objAnimadores);
        });
      }

      console.log(listaAnimador);
      return listaAnimador;
    }


  }

})();
