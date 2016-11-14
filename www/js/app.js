
angular.module('starter', ['ionic', 'starter.controllers','ngCordova', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
//routers provider
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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
  .state('app.detalles', {
      url: '/detalles',
      views: {
        'menuContent': {
          templateUrl: 'templates/detalles.html',
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
  $urlRouterProvider.otherwise('/app/menu');
});