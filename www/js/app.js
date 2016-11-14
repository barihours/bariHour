// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'
  
  })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
  
  .state('app.menu', {
    url: '/menu',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.listaCerve', {
      url: '/listaCerve',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaCerve.html',
          controller: 'Lista'
        }
      }
    })
  .state('app.listaBar', {
      url: '/listaBar',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaBar.html',
          controller: 'Lista'
        }
      }
    })
  .state('app.detallesBar', {
      url: '/detallesBar',
      views: {
        'menuContent': {
          templateUrl: 'templates/detallesBar.html',
          controller: 'Detalles'
        }
      }
    })
  .state('app.detallesCerve', {
      url: '/detallesCerve',
      views: {
        'menuContent': {
          templateUrl: 'templates/detallesCerve.html',
          controller: 'Detalles'
        }
      }
    })
    .state('app.mapa', {
      url: '/mapa',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});