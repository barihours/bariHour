angular.module('starter.services', [])
.service('MyService', function () {
  var property;
  var array;
  var item;
  var lat;
  var long;
  return {
      getLat: function () {
          return lat;
      },
      getLon: function () {
          return long;
      },
      setLocation: function(value) {
          lat = value.coords.latitude;
          long = value.coords.longitude;
      },
      getProperty: function () {
          return property;
      },
      setProperty: function(value) {
          property = value;
      },
      getArray: function () {
          return array;
      },
      setArray: function(value) {
          array = value;
      },
      getItem: function () {
          return item;
      },
      setItem: function (value) {
          item=value;
      }
  };
})
.factory('Imagenes', function(){
  //crea el acceso al almacenamieto a firebase
  var storage = firebase.storage();
  //Crea la regerencia a dicho almacenamiento
  var storageRef = storage.ref();
  //crea referencia a las imagenes
  var imagesRef = storageRef.child('img');
  return imagesRef;

})
.factory('Marks', function(){
  var database = firebase.database();//se llama a a base de datos en firebase
  var databaseRef= database.ref();
  //var databaseRef= database.ref('/marcadores/');
  var marcadoresRef = databaseRef.child('/marcadores/');//se carga la regerencia a marcadores
  //var marcadoresRef = databaseRef;//se carga la regerencia a marcadores
  var marcadores = [];//varable tipo array para cargar los marcdores
  //referencia es una variable temporal para cargar el array
  //var referencias = marcadoresRef.on('value', function(data) {
   var referencias = marcadoresRef.on('value', function(data) { 
    var i = 0;
    //console.log(data.val());
    data.forEach(function(marcador) {
      i++;
      var arr2 = {};
      //console.log('El marcador '+marcador.key +'es ' + marcador.val());
      arr2 = {
        key: marcador.key,
        descrip: marcador.val().descrip,
        direccion:marcador.val().direccion ,
        end: marcador.val().end,
        facebook:marcador.val().facebook,
        horario: marcador.val().horario,
        iconMarKer:marcador.val().iconMarKer,
        id:marcador.val().id,
        image: marcador.val().image,
        image2:marcador.val().image2,
        image3:marcador.val().image3,
        lat: marcador.val().lat,
        lng: marcador.val().lng,
        logo:marcador.val().logo,
        name: marcador.val().name,
        start: marcador.val().start,
        telefono:marcador.val().telefono,
        tipo: marcador.val().tipo,
        twiter:marcador.val().twiter,
         web:marcador.val().web       
        //icon:marcador.val().icon,        
       // image1:marcador.val().image1,
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

});
