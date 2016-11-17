angular.module('starter.controllers', [])

/*.controller('AppCtrl', function($scope, MyService, Marks, $http, $cordovaGeolocation) {
  $scope.myFunc = function(e) {
    MyService.setProperty(e);
  };
  $scope.tipo = function(e) {
    MyService.setTipo(e);
    console.log('setea tipo',e);
  };
  $cordovaGeolocation.getCurrentPosition()
    .then(function() {
    })
    .catch(function() {
      console.log("Error de ubicacion")
      alert("Por favor enciende el GPS")
    })
  })*/
.controller('AppCtrl', function($scope, $timeout, firebase, $state, MyService, Marks,$http,$cordovaGeolocation) {
  //$scope, $timeout, firebase, $state
   var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
     console.log ('current user ',user);
  if (user != null) {
    /*user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });*/
    console.log ('current user lista',user);
    //$state.go('app.menu', {});

    /* User is signed in.
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;*/
  } 
  else {
    $state.go('home', {});
  }
  $scope.doLogout = function () {
      $timeout(function () {
        $state.go('home', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo ...");

    }

  //ternina lo relacionado a loggin y log out o currentUser null
  console.log("AppCtrl");
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
  $scope.doLogout = function () {
     console.log("logout AppCtrl");
      $timeout(function () {
        $state.go('home', {})
      }, 1);
      firebase.auth().signOut()
      console.log("Saliendo ...");
     };
  $cordovaGeolocation.getCurrentPosition()
    .then(function() {
    })
    .catch(function() {
      console.log("Error de ubicacion")
      alert("Por favor enciende el GPS")

    })
    /*
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
    */
    /*if(MyService.setArray()==null){
    $http.get('js/markers.json').then(function(response){
    MyService.setArray(response.data);
            })}*/

/*
function logout() {
  localStorage.removeItem('profile');
  firebase.auth().signOut().then(function() {
    console.log("Signout Successful")
  }, function(error) {
    console.log(error);
  });
}*/
})
.controller('loginCtrl',function($scope, $timeout, firebase, $state){
  // $scope, $timeout, firebase, $state
  console.log ('loginctrl');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // el usuario que esta logueado en firebase en la esta aplicacion
      //para poder cambiar por ahora hay que eliminar el usuario
      console.log ('onAuthStateChanged');
      /*user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });*/
      $state.go('app.menu', {});
    } else {
      // No user is signed in.
       console.log ('no perteneca a firebase');
    }
  });
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
     console.log ('current user ',user);
  if (user != null) {
    /*user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });*/
    console.log ('current user 2',user);
    $state.go('app.menu', {});

    /* User is signed in.
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;*/
  } else {
    // No user is signed in.
     console.log ('loginctrl2');
     //$state.go('app.home', {});
     $scope.login_social= function(google){
    //inicio con popup

     var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function (result){
        //   This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      //$state.go('app.menu', {});
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.error("Fallo en Authentication google:", error);
         // ...
      });
      //$state.go('app.menu', {});

      //inicio con redirect
      /*var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        $state.go('app.menu', {});
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
         // ...
      });*/
    }
  }


})

 .controller('MapCtrl', function($scope,$cordovaGeolocation, $http, $filter, MyService, Marks,$timeout,$state) {
 // $scope, $timeout, firebase, $state
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
     console.log ('current user ',user);
  if (user != null) {
    /*user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });*/
    console.log ('current user lista',user);
    //$state.go('app.menu', {});

    /* User is signed in.
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;*/
  } 
  else {
    $state.go('home', {});
  }
  $scope.doLogout = function () {
      $timeout(function () {
        $state.go('home', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo ...");

    }

 //termina lo relacionado a loggin y loggout
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
.controller('Lista',function($scope, $timeout, firebase, $state, Marks, MyService) {
  // $scope, $timeout, firebase, $state
  //$scope.data=MyService.getArray();
  var user = firebase.auth().currentUser;
  //var name, email, photoUrl, uid;
  //if (user) {
     console.log ('current user ',user);
  if (user != null) {
    /*user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });*/
    console.log ('current user lista',user);
    //$state.go('app.menu', {});

    /* User is signed in.
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;*/
  } 
  else {
    $state.go('home', {});
  }

  $scope.doLogout = function () {
      /*$timeout(function () {
        $state.go('home', {})
      }, 1);*/
      firebase.auth().signOut()
      
      console.log("Saliendo ...");
       $timeout(function () {
        $state.go('home', {})
      }, 1);

    }
  $scope.data=Marks.all();

  //master quita esta busqueda de tipo 
  //$scope.tipo=MyService.getTipo();
  //console.log('lista cotroller', $scope.data, $scope.tipo);
  //esto queda
  $scope.detalle = function(e) {
    MyService.setItem(e);
  };
})

//controladores de la pagina de detalles de las cervecerias y bares desd json
.controller('Detalles',function($scope, $timeout, firebase, $state, Marks, MyService) {
  // $scope, $timeout, firebase, $state
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
     console.log ('current user ',user);
  if (user != null) {
    /*user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });*/
    console.log ('current user lista',user);
    //$state.go('app.menu', {});

    /* User is signed in.
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid;*/
  } 
  else {
    $state.go('home', {});
  }
  $scope.doLogout = function () {
      $timeout(function () {
        $state.go('home', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo ...");

    }
  $scope.data=Marks.all();
  $scope.id=MyService.getItem();
  console.log("myservice scope id",$scope.id);
  $scope.item=$scope.data[$scope.id];// busca el item en array de firebase, suma uno para traer ee correcto
  console.log("detalles scope item",$scope.item);
});
//controladores de las listas de ceervecerias y bares desde json
/*.controller('Lista',function($scope, MyService) {
$scope.data=MyService.getArray();
$scope.tipo=MyService.getTipo();
$scope.detalle = function(e) {
        MyService.setItem(e);
    };


})*/
//controladores de la pagina de detalles de las cervecerias y bares desd json
/*.controller('Detalles',function($scope, MyService) {
$scope.data=MyService.getArray();
$scope.id=MyService.getItem();
console.log($scope.id);
$scope.item=$scope.data.marcadores[$scope.id];
console.log($scope.item);
});*/
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

/*.service('MyService', function () {
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
})*/
//fabrica de array firebase
/*.factory('Marks', function(){
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
        image: marcador.val().image

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
    /*get: function(marcadorId) {//crea los marcadores para pasarlos al controlador que los llama
      for (var i = 0; i < marcadores.length; i++) {
        if (marcadores[i].key === parseInt(marcadorId)) {
          return marcadores[i];
        }
      }
      return null;
    }
  };

})*/
/*.controller('AppCtrl', function($scope,MyService,Marks,$http) {
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

  $cordovaGeolocation.getCurrentPosition()
    .then(function() {
    })
    .catch(function() {
      console.log("Error de ubicacion")
      alert("Por favor enciende el GPS")

    })
    //la version master quita esta parte de la busqueda
  
  
    /*if(MyService.setArray()==null){
    $http.get('js/markers.json').then(function(response){
    MyService.setArray(response.data);
            })}*/
//})





