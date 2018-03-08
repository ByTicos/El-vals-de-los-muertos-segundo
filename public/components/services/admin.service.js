(() => {
  'use strict';

  angular
  .module('funeraria')
  .service('servicioAdministrador', servicioAdministrador)

  servicioAdministrador.$inject = ['$log','$http'];

  function servicioAdministrador($log, $http){
    
  }
})();