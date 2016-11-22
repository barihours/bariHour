angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $timeout, firebase, $state, MyService, Marks,$http,$cordovaGeolocation) {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
  if (user != null) {
   // console.log ('current user lista',user);
  } 
  else {
    $state.go('home', {});
  }
  $scope.doLogout = function () {
      $timeout(function () {
        $state.go('home', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo (app)...");

    }

  //ternina lo relacionado a loggin y log out o currentUser null

  $scope.myFunc = function(e) {
    MyService.setProperty(e);
  
  };
    
  $cordovaGeolocation.getCurrentPosition()
    .then(function(position) {
      MyService.setLocation(position);
    })
    .catch(function() {
      console.log("Error de ubicacion")
      alert("Por favor enciende el GPS")

    })
   /*if(MyService.setArray()==null){
    $http.get('js/markers.json').then(function(response){
    MyService.setArray(response.data);
            })}*/

})
.controller('userCtrl',function($scope, $timeout, firebase, $state){
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
  if (user != null) {
    //console.log ('userCtrl',user);
    //$state.go('app.menu', {});
    //muestro los valores de la base de datos firebase por consola
    /*user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });*/

    //User is signed in.
    $scope.name = user.displayName;
    $scope.email = user.email;
    $scope.photoUrl = user.photoURL;
    $scope.uid = user.uid;
    //console.log('email: ',$scope.uid);
  } 
  else {
    $state.go('home', {});
  };

  $scope.doLogout = function () {
      $timeout(function () {
        $state.go('home', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo (user)...");

    }
    $scope.cambiarUser=function(){
      var user = firebase.auth().currentUser;
    user.delete()
    firebase.auth().signOut()
    //console.log("cambiar user ...");
    console.log("Saliendo (user)...");
      /*console.log ('cambiar usuario');
      var user= firebase.auth().currentUser;
      console.log("borrado ...",user);
      firebase.auth().signOut()
      console.log("Cambiar ...",user);*/
      $state.go('home', {})
    }
})
.controller('loginCtrl',function($scope, $timeout, firebase, $state,$ionicModal){
  // $scope, $timeout, firebase, $state
 // console.log ('loginctrl');

  /*$ionicModal.fromTemplateUrl('login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });*/
  firebase.auth().onAuthStateChanged(function(user) {
    //muestra loadin hasta que termina de realizar el proceso de autenticacion
    
    if (user) {
      //console.log('user onAuthStateChanged ', user)
      // el usuario que esta logueado en firebase en la esta aplicacion
      //para poder cambiar por ahora hay que eliminar el usuario
      
      $state.go('app.menu', {});
    } else {
      // No user is signed in.
       //console.log ('no perteneca a firebase');
    }
  });
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
  if (user != null) {
    $state.go('app.menu', {});
  } 
  else {
    // No user is signed in.
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
      })
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
    $scope.loginFace=function(Facebook){
        //console.log('face');
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          //var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          //var credential = error.credential;
          if (errorCode === 'auth/wrong-password') {
          alert('password incorrecto');
        } else {
          alert(errorMessage);
        }
          // ...
        })
      }
      $scope.doLoginAction= function(creds){
        firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("Fallo en Authentication :", erroCode);
          // ...
        });
      }// doLoginAction
      $scope.doCreateUserAction=function(creds){
        firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }
    }//sale del else
  


})

 .controller('MapCtrl', function($scope,$cordovaGeolocation, $http, $filter, MyService, Marks,$timeout,$state) {
 // $scope, $timeout, firebase, $state
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;
  //if (user) {
  if (user != null) {
    //$state.go('app.menu', {});
  } 
  else {
    $state.go('home', {});
  }
  $scope.doLogout = function () {
      $timeout(function () {
        $state.go('home', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo (map)...");

    }//termina lo relacionado a loggin y loggout
  var lat=MyService.getLat();
  var lon=MyService.getLon();
  //$scope.centrado=(MyService.getUbicacion());
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
      angular.forEach($scope.data, function(value, key){
       console.log('mapa',$scope.data);
        //Verifica si esta entre el horario y cambia el icono
        if (($scope.opcion)===value.tipo|| $scope.opcion===0){
         
          if (today>value.start && today<value.end){
            var animation=google.maps.Animation.BOUNCE
          }
          //Setea marcador
          marker = new google.maps.Marker({
            map: $scope.map,
            animation: animation,
            title: value.name,
            icon: {url:value.iconMarKer},
            position: {lat: value.lat,lng: value.lng},
             
          });  
          //console.log ('mapa',value.iconMarKer);
          //Descripcion cada marcador   
          var infoWindow = new google.maps.InfoWindow({
            //content: value.name,
            //agrega ver mas en la descripcion de cada marcador
            content:  "<div id= \"contentInfo\"><div id=\"name\"> <b>"+value.name+"</b></div>"+ value.horario+"<br> "+value.telefono +"<br><div><a class=\"button button-clear button-dark\" href=\"#/app/detalles\" ng-click=\"detalle()\"><b>Ver Mas</b></a> </div></div>"
          
          })
          //Agrega Evento de click
          google.maps.event.addListener(marker, 'click', function(idmarker,key){

            if( prev_infowindow ) {
              prev_infowindow.close();
            }
          
            //Guarda el valor del marcador clickeado para luego pasar este valor a detalle()
            MyService.setItem(value.id);

            prev_infowindow = infoWindow;
            infoWindow.open($scope.map, this);       
          });
          //markers.push(marker);
        }
      })
      function CenterControl(controlDiv, map) {

              // Set CSS for the control border.
              var controlUI = document.createElement('div');
              controlUI.style.backgroundColor='#fff';
              controlUI.style.border = '2px solid #fff';
              controlUI.style.borderRadius = '3px';
              controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
              controlUI.style.marginBottom = '22px';
              controlUI.style.marginRight = '8px';
              controlUI.style.textAlign = 'center';
              controlDiv.appendChild(controlUI);

              // Set CSS for the control interior.
              var controlText = document.createElement('div');
              controlText.style.color = 'rgb(25,25,25)';
              controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
              controlText.style.fontSize = '12px';
              controlText.style.lineHeight = '38px';
              controlText.style.paddingLeft = '5px';
              controlText.style.paddingRight = '5px';
              controlText.innerHTML = '<b>GPS</b>';
              controlUI.appendChild(controlText);

              // Setup the click event listeners: go to your location.
              controlUI.addEventListener('click', function() {
                if (lat)
                map.setCenter(new google.maps.LatLng(lat, lon));
              });

            }


              // Create the DIV to hold the control and call the CenterControl() constructor
              // passing in this DIV.
              var centerControlDiv = document.createElement('div');
              var centerControl = new CenterControl(centerControlDiv, $scope.map);
              centerControlDiv.index = 1;
              $scope.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
    
    })
  //})
})




//controladores de las listas de cerveceria y bares desde firebase
.controller('Lista',function($scope, $timeout, firebase, $state, Marks, MyService,$filter) {
  // $scope, $timeout, firebase, $state
  //$scope.data=MyService.getArray();
  var user = firebase.auth().currentUser;
  //var name, email, photoUrl, uid;
  //if (user) {
  if (user != null) {
      
    } 
  else {
    $state.go('home', {});
  }

  $scope.doLogout = function () {
      /*$timeout(function () {
        $state.go('home', {})
      }, 1);*/
    var user = firebase.auth().currentUser;
    //user.delete()
    firebase.auth().signOut()
    console.log("Saliendo (lista)...");
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
.controller('Detalles',function($scope, $timeout, firebase, $state, Marks, MyService, Imagenes) {
  // $scope, $timeout, firebase, $state
   //console.log("detallesCtrl");
  $scope.doLogout = function () {
          /*$timeout(function () {
            $state.go('home', {})
          }, 1);*/
    var user = firebase.auth().currentUser;

    //user.delete();
    firebase.auth().signOut();
    console.log("Saliendo (detall)...");
    $timeout(function () {
      $state.go('home', {})
    }, 1);

    }
  var user = firebase.auth().currentUser;
  //var name, email, photoUrl, uid;
  
  if (user != null) {
    
    //$state.go('app.menu', {})
  } 
  else {
    $state.go('home', {});
  }

  $scope.data=Marks.all();
  $scope.id=MyService.getItem();
    
  $scope.item=$scope.data[$scope.id];// busca el item en array de firebase
  
  //creo un mini mapa con el marcador en el item.
      var myCenter = new google.maps.LatLng($scope.item.lat,$scope.item.lng);
      
      var mapProp = {
          center: myCenter,
          zoom: 15,
          draggable: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
      };
      $scope.map = new google.maps.Map(document.getElementById("map"),mapProp);
      marker = new google.maps.Marker({
          position: myCenter,
      });
      marker.setMap($scope.map);
      
      var slideIndex = 0;
      showSlides();
      //Controlador de la galeria de imagenes.
      function showSlides() {
          var i;
          var slides = document.getElementsByClassName("mySlides");
          for (i = 0; i < slides.length; i++) {
             slides[i].style.display = "none";
          }
          slideIndex++;
          if (slideIndex> slides.length) {slideIndex = 1}
          slides[slideIndex-1].style.display = "block";
          setTimeout(showSlides, 3000); // Change image every 2 seconds
      }

});
