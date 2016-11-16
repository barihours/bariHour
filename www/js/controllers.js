angular.module('starter.controllers', [])


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
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var marker = new google.maps.Marker({
        map: $scope.map,
        position: latLng
      });  

  })
   //defino estilo de mapa para borrar negocios
  var myStyle = [{
    stylers: [
      { hue: "#00ffe6" },
      { saturation: -20 }
    ]},  
    {
      featureType: "poi.business", 
      elementType: "labels", 
      stylers: [{ visibility: "off"}]
    }
  ];
  var styledMap = new google.maps.StyledMapType(myStyle, {name: "Styled Map"});
  //GPS aveces incorrecto
  /*var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);*/
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
  //valor inicial para variable de infowindow
    var prev_infowindow =false; 
    var markers=[];
    /*var marker = new google.maps.Marker({
      map: $scope.map,
      position: latLng
    }); */ 
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      //Espera hasta que el mapa haya cargado
      var today = $filter('date')(new Date(),'HH:mm:ss');
      //Marcadores
     //$scope.data=MyService.getArray();//desde json
      $scope.data=Marks.all();// desde firebase
      markers=$scope.data;
      //Loop json
      //angular.forEach($scope.data.marcadores, function(value, key){//desde json
      console.log('por cada value',$scope.data);
      console.log('scope.data',markers.length)
      angular.forEach($scope.data, function(value, key){
        console.log('fuera del if',$scope.opcion, value.tipo);
        //Verifica si esta entre el horario y cambia el icono
        if (($scope.opcion)===value.tipo|| $scope.opcion===0){
          console.log('dentro del if opcion--tipo',$scope.opcion, value.tipo, value.icon);
          if (today>value.start && today<value.end){
            var animation=google.maps.Animation.BOUNCE
          }
          //Setea marcador
          marker = new google.maps.Marker({
            map: $scope.map,
            animation: animation,
            title: value.name,
            icon: {
              url:value.icon
            },
            position: {
              lat: value.lat,
              lng: value.lng
            }
          });  
          //Descripcion cada marcador   
          var infoWindow = new google.maps.InfoWindow({
            content: value.name
          });
          //Agrega Evento de click
          google.maps.event.addListener(marker, 'click', function(){
            if( prev_infowindow ) {
              prev_infowindow.close();
            }

            prev_infowindow = infoWindow;
            infoWindow.open($scope.map, this);
          });
          //markers.push(marker);
        }
      })
    })
  //})
})




//controladores de las listas de cerveceria y bares desde firebase
.controller('Lista',function($scope, Marks, MyService) {
  //$scope.data=MyService.getArray();
  $scope.data=Marks.all();

  //master quita esta busqueda de tipo 
  $scope.tipo=MyService.getTipo();
  console.log('lista cotroller', $scope.data, $scope.tipo);
  //esto queda
  $scope.detalle = function(e) {
    MyService.setItem(e);
  };
})

//controladores de la pagina de detalles de las cervecerias y bares desd json
.controller('Detalles',function($scope, Marks, MyService) {
  $scope.data=Marks.all();
  $scope.id=MyService.getItem();
  console.log("myservice scope id",$scope.id);
  $scope.item=$scope.data[$scope.id];// busca el item en array de firebase, suma uno para traer ee correcto
  console.log("detalles scope item",$scope.item);
});
