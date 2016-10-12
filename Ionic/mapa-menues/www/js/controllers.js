angular.module('starter.controllers', ['ngCordova'])
.controller('MapCtrl', function($scope,$cordovaGeolocation, $http, $filter) {
  
  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 //defino estilo de mapa para borrar negocios
    var myStyle = [ 
{ 
          featureType: "poi.business", 
          elementType: "labels", 
          stylers: [ 
              { visibility: "off" } 
          ]
        }
        ];
        var styledMap = new google.maps.StyledMapType(myStyle, {name: "Styled Map"});
    //GPS aveces incorrecto
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //var latLng = new google.maps.LatLng(-41.133478, -71.310431);
    var mapOptions = {
      mapTypeControlOptions: { 
        mapTypeIds: ['myStyle'] 
      }, 
      center: latLng,
      zoom: 17,
      mapTipeId: 'myStyle'
    };
    //Creo mapa
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Le asigno el estilo de mapa personalizado
    $scope.map.mapTypes.set('map_style', styledMap);
    $scope.map.setMapTypeId('map_style');
 
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: latLng
  });  
    //Espera hasta que el mapa haya cargado
google.maps.event.addListenerOnce($scope.map, 'idle', function(){

//Hora actual en hh:mm:ss
var today = $filter('date')(new Date(),'HH:mm:ss');
//Marcadores
//Carga Json
$http.get('js/markers.json').then(function(response){
            $scope.data = response.data;
  //Loop json
  angular.forEach($scope.data.marcadores, function(value, key){
  //Verifica si esta entre el horario y cambia el icono
  if (today>value.start && today<value.end){
      //value.icon="";
       var animation=google.maps.Animation.BOUNCE}
  //Setea marcador
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: animation,
      title: value.descrip,
      icon: {url:value.icon},
      position: {lat: value.lat,
                  lng: value.lng}
  });  
  //Descripcion cada marcador   
   var infoWindow = new google.maps.InfoWindow({
      content: value.descrip
    });
   //Agrega Evento de click
   google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
})  
}) 
}) 
})
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
