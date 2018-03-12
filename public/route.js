(() => {
  'use strict';
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {

    $stateProvider
      .state('landingPage', {
        url: '/',
        templateUrl: './components/landingPage/landingPage.view.html',
        data:{
          pageTitle: 'El Vals de Los Muertos'
        }
      })

      .state('admin', {
        url: '/admin',
        templateUrl: './components/admin/admin.view.html',
        data:{
          pageTitle: 'Registro admin'
        },
        params: {
          objUsuarioTemp:''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/admin/admin.controller.js')
          }]
        },
        controller: 'controladorAdministrador',
        controllerAs: 'vm'
      })

      .state('usuarios', {
        url: '/users',
        templateUrl: './components/usuarios/usuarios.view.html',
        data:{
          pageTitle: 'Registro usuarios'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/usuarios.controller.js')
          }]
        },
        controller: 'controladorUsuarios',
        controllerAs: 'vm'
      })

      .state('editarUsuarios', {
        url: '/editarUsuarios',
        templateUrl: './components/usuarios/editarUsuarios.view.html',
        data:{
          pageTitle: 'Editar usuario'
        },
        params: {
          objUsuarioTemp:''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/editarUsuarios.controller.js')
          }]
        },
        controller: 'controladorEditarUsuarios',
        controllerAs: 'vm'
      })

      .state('logIn', {
        url: '/logIn',
        templateUrl: './components/logIn/logIn.view.html',
        data:{
          pageTitle: 'Iniciar sesión'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/logIn/logIn.controller.js')
          }]
        },
        controller: 'controladorLogin',
        controllerAs: 'vm'
      })

//registro de muertos
      .state('registrarMuertos', {
        url: '/muertos',
        templateUrl: './components/muertos/registroMuertos.view.html',
        data:{
          pageTitle: 'Registro de muertos'
        },
        params: {
          objUsuarioTemp:''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/muertos/registroMuerto.controller.js')
          }]
        },
        controller: 'controladorRegistroMuerto',
        controllerAs: 'vm'
      })

      .state('registroEntierros', {
        url: '/entierros',
        templateUrl: './components/retoques/registroEntierros.view.html',
        data: {
          pageTitle: 'Entierros'
        },
        params: {
          objMuertoTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/ent/registroEntierros.controller.js')
          }]
        },
        controller: 'controladorRegistroEntierros',
        controllerAs: 'vm'
      })

      .state('registroLugares', {
        url: '/registroLugares',
        templateUrl: './components/lugares/registroLugares.view.html',
        data: {
          pageTitle: 'Registro de Lugares'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/lugares/registroLugares.controller.js')
          }]
        },
        controller: 'controladorRegistroLugares',
        controllerAs: 'vm'
      })

      .state('registroRetoques', {
        url: '/registroRetoques',
        templateUrl: './components/retoques/registroRetoques.view.html',
        data: {
          pageTitle: 'Retoques'
        },
        params: {
          objMuertoTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/retoques/registroRetoques.controller.js')
          }]
        },
        controller: 'controladorRegistroRetoques',
        controllerAs: 'vm'
      })

      .state('registroFiestas', {
        url: '/fiestas',
        templateUrl: './components/fiestas/registroFiestas.view.html',
        data: {
          pageTitle: 'Fiestas'
        },
        params: {
          objMuertoTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/fiestas/registroFiestas.controller.js')
          }]
        },
        controller: 'controladorRegistroFiestas',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  };

})();
