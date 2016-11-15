angular.module('starter.controllers', [])
.service('MyService', function () {
  var property;
  var array;
  var ubicacion;
  var tipo;
  var item;
  return {
    getProperty: function () {
      return property;
    },
    setProperty: function(value) {
      property = value;
    },
    setUbicacion: function (value) {
      ubicacion=value;
    },
    getUbicacion: function () {
      return ubicacion;
    },
    getArray: function () {
      return array;
    },
    setArray: function(value) {
      array = value;
    },
    getTipo: function () {
      return tipo;
    },
    setTipo: function (value) {
      tipo=value;
    },
    getItem: function () {
      return item;
    },
    setItem: function (value) {
      item=value;
    }
  };
})
//fabrica de array firebase
.factory('Marks', function(){
  var database = firebase.database();//se llama a a base de datos en firebase
  var databaseRef= database.ref();
  var marcadoresRef = databaseRef.child('/marcadores/');//se carga la regerencia a marcadores
  var marcadores = [{}];//varable tipo array para cargar los marcdores
  //referencia es una variable temporal para cargar el array
  var referencias = marcadoresRef.on('value', function(data) {
    var i = 0;
    //console.log(data.val());
    data.forEach(function(marcador) {
      i++;
      var arr2 = {};
      //console.log('El marcador '+marcador.key +'es ' + marcador.val());
      arr2 = {
        key: marcador.key,
        id:marcador.val().id,
        descrip: marcador.val().descrip,
        tipo: marcador.val().tipo,
        start: marcador.val().start ,
        end: marcador.val().end,
        icon:marcador.val().icon,
        lat: marcador.val().lat,
        lng: marcador.val().lng,
        image: marcador.val().image,
        name: marcador.val().name,
        horario: marcador.val().horario

       };
      marcadores.push(arr2);
   });
  });

  return {
    all: function() {//muestra todos los marcaodres
      return marcadores;
    },
    /*remove: function(marcador) {//esta funcion no la utiizamos
      chats.splice(chats.indexOf(marcador), 1);
    },*/
    get: function(marcadorId) {//crea los marcadores para pasarlos al controlador que los llama
      for (var i = 0; i < marcadores.length; i++) {
        if (marcadores[i].key === parseInt(marcadorId)) {
          return marcadores[i];
        }
      }
      return null;
    }
  };

})
.controller('AppCtrl', function($scope,MyService,Marks,$http) {
  $scope.myFunc = function(e) {
    MyService.setProperty(e);
    console.log("Get property",MyService.getProperty());
  };
  $scope.ubicacion = function(e) {
    MyService.setUbicacion(e);
  };
  $scope.tipo = function(e) {
     MyService.setTipo(e);
  };
  
    /*if(MyService.setArray()==null){
    $http.get('js/markers.json').then(function(response){
    MyService.setArray(response.data);
            })}*/
})
  
.controller('MapCtrl', function($scope,$cordovaGeolocation, $http, $filter, MyService, Marks) {
  $scope.centrado=(MyService.getUbicacion());
  $scope.opcion=(MyService.getProperty());
  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    //defino estilo de mapa para borrar negocios
    var myStyle = [{
      stylers: [{ 
        hue: "#00ffe6" },
        { 
        saturation: -20 }
      ]},
     
    {         
      featureType: "poi.business", 
      elementType: "labels", 
      stylers: [{
         visibility: "off" 
       }]
    }];
    var styledMap = new google.maps.StyledMapType(myStyle, {name: "Styled Map"});
    //GPS aveces incorrecto
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    latLngCentro = new google.maps.LatLng(-41.135893,  -71.310535);
    /*if ($scope.centrado==1){
      latLngCentro=latLng;
    }
    else latLngCentro = new google.maps.LatLng(-41.135893,  -71.310535);
    console.log(latLngCentro);*/
    var mapOptions = {
      mapTypeControlOptions: { 
        mapTypeIds: ['myStyle'] 
      }, 
      center: latLngCentro,
      zoom: 17,
      mapTipeId: 'myStyle'
    };
    //Creo mapa
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Le asigno el estilo de mapa personalizado
    $scope.map.mapTypes.set('map_style', styledMap);
    $scope.map.setMapTypeId('map_style');
    var markers=[];
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: latLng
    });  
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      //Espera hasta que el mapa haya cargado
      var today = $filter('date')(new Date(),'HH:mm:ss');
      //Marcadores
     //$scope.data=MyService.getArray();//desde json
      $scope.data=Marks.all();// desde firebase
      //Loop json
      //angular.forEach($scope.data.marcadores, function(value, key){//desde json
      console.log('estoy en el for each MapCtrl');
      console.log('por cada value',$scope.opcion);
      angular.forEach($scope.data, function(value, key){
        console.log('por cada value',$scope.opcion);
        //Verifica si esta entre el horario y cambia el icono
        if ($scope.opcion==value.tipo|| $scope.opcion==0){
          if (today>value.start && today<value.end){
            //value.icon="";
            var animation=google.maps.Animation.BOUNCE
          }
          //Setea marcador
          marker = new google.maps.Marker({
            map: $scope.map,
            animation: animation,
            title: value.descrip,
            icon: {url:value.icon},
            position: {
              lat: value.lat,
              lng: value.lng
            }
          });  
          //Descripcion cada marcador   
          var infoWindow = new google.maps.InfoWindow({
            content: value.descrip
          });
          //Agrega Evento de click
          google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
          });
          markers.push(marker);
        }
      })
    })
  })
})
//controladores de las listas de ceervecerias y bares desde json
/*.controller('Lista',function($scope, MyService) {
$scope.data=MyService.getArray();
$scope.tipo=MyService.getTipo();
$scope.detalle = function(e) {
        MyService.setItem(e);
    };


})*/
//controladores de las listas de cerveceria y bares desde firebase
.controller('Lista',function($scope, Marks, MyService) {
  //$scope.data=MyService.getArray();
  $scope.data=Marks.all();
  $scope.tipo=MyService.getTipo();
  console.log("myservice scope tipo",$scope.tipo);
  $scope.detalle = function(e) {
    MyService.setItem(e);
  };
})
//controladores de la pagina de detalles de las cervecerias y bares desd json
/*.controller('Detalles',function($scope, MyService) {
$scope.data=MyService.getArray();
$scope.id=MyService.getItem();
console.log($scope.id);
$scope.item=$scope.data.marcadores[$scope.id];
console.log($scope.item);
});*/
//controladores de la pagina de detalles de las cervecerias y bares desd json
.controller('Detalles',function($scope, Marks, MyService) {
  $scope.data=Marks.all();
  $scope.id=MyService.getItem();
  console.log("myservice scope id",$scope.id);
  $scope.item=$scope.data[$scope.id +1];// busca el item en array de firebase, suma uno para traer ee correcto
  console.log("detalles scope item",$scope.item);
});
/*directionsDisplay = new google.maps.DirectionsRenderer({
              });
start  = new google.maps.LatLng(-41.135893,  -71.310535);
  end = new google.maps.LatLng(-41.135893,  -71.310000);   
var directionsService = new google.maps.DirectionsService();
var request = {
                  origin: start,
                  destination: end,
                  optimizeWaypoints: true,
                  travelMode: google.maps.DirectionsTravelMode.WALKING
              };
directionsService.route(request, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response);
                      var route = response.routes[0];

                  }
              });
*/







