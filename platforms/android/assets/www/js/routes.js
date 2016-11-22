
angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    cache: false
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    cache: false
  })
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
     controller:'AppCtrl' 
    })
  .state('app.menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    cache: false
    })
  .state('app.listaCerve', {
    url: '/listaCerve',
    templateUrl: 'templates/listaCerve.html',
    controller: 'Lista',
    cache: false
    })
  .state('app.listaBar', {
    url: '/listaBar',
    templateUrl: 'templates/listaBar.html',
    controller: 'Lista',
    cache: false    
    })
  .state('app.listaPubs', {
    url: '/listaPubs',
    templateUrl: 'templates/listaPubs.html',
    controller: 'Lista',
    cache: false    
    })  
  .state('app.usuario', {
    url: '/usuario',
    templateUrl: 'templates/usuario.html',
    controller: 'userCtrl',
    cache: false

    })
  .state('app.detalles', {
    url: '/detalles',
    templateUrl: 'templates/detalles.html',
    controller: 'Detalles',
    cache: false
    })
  .state('app.mapa', {
    url: '/mapa',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl',
    cache: false
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});