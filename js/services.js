angular.module('starter.services', [])
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
        id:marcador.val().id,
        descrip: marcador.val().descrip,
        tipo: marcador.val().tipo,
        start: marcador.val().start,
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

});
