(() => {
  'use strict';
  angular
  .module('funeraria')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log','$http'];

  function servicioUsuarios($log, $http){

    const asyncLocalStorage = {
      setItem: function (key, value) {
          return Promise.resolve().then(() => {
              let response = true;
              localStorage.setItem(key, JSON.stringify(value));
              return response
          });
      }
    };

    let publicAPI = {
      addUsuario : _addUsuario,
      getUsuarios : _getUsuarios,
      addMuerto : _addMuerto,
      getMuerto : _getMuerto,
      getAllMuertos: _getAllMuertos,
      addFiesta: _addFiesta,
      addRetoques: _addRetoques,
      eliminarUsuario: _eliminarUsuario,
      activarUsuario: _activarUsuario,
      actualizarUsuario:_actualizarUsuario
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addUsuario(pnuevoUsuario){
      let listaUsuarios = _getUsuarios();
      let respuesta = true;
      listaUsuarios.push(pnuevoUsuario);

      asyncLocalStorage.setItem('usuariosLS', listaUsuarios).then((response) =>{
        respuesta = response;
      });

      return respuesta;
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getUsuarios(){
      let listaUsuarios = [];
      let listaUsuariosLocal = JSON.parse(localStorage.getItem("usuariosLS"));

      if(listaUsuariosLocal == null){
        listaUsuarios = [];
      }else{
        listaUsuariosLocal.forEach(obj => {

          let objUsuarios = new Cliente(obj.foto, obj.nombre, obj.apellido, obj.cedula, obj.provincia, obj.canton, obj.distrito, obj.ubicacion, obj.fechaNacimiento, obj.edad, obj.genero, obj.nombreUsuario, obj.contrasenna);

          objUsuarios.cambiarEstado(obj.estado);
          

          obj.listaMuertos.forEach(objMuertos =>{
            let objMuertoTemporal = new Muerto (objMuertos.apodo, objMuertos.edad, objMuertos.genero, objMuertos.tamanno, []);

            objMuertos.fiesta.forEach(objFiesta =>{

              let objFiestaTemporal = new Fiestas (objFiesta.fecha, objFiesta.duracion, objFiesta.costo, objFiesta.animador);

              objMuertoTemporal.registrarFiesta(objFiestaTemporal);

              objMuertoTemporal.forEach(objRetoque =>{

                let objRetoqueTemporal = new Retoques (objRetoque.id, objRetoque.nombre, objRetoque.costo);

                objMuertoTemporal.agregarRetoqueaMuerto(objRetoqueTemporal);
              })
            })

            objUsuarios.registrarMuerto(objMuertoTemporal);

          })
          listaUsuarios.push(objUsuarios);
        });
      }

      return listaUsuarios;
    }
     function _addMuerto (pnuevoMuerto) {
      let listaUsuarios = _getUsuarios();
      let sesion = JSON.parse(sessionStorage.getItem('sesion'));

      for(let i = 0; i < listaUsuarios.length; i++){
        if (sesion.cedula == listaUsuarios[i].obtenerCedula()){
          listaUsuarios[i].registrarMuerto(pnuevoMuerto);
        }
      }

      actualizarLocal(listaUsuarios);
  
};

function _getMuerto () {
 let listaUsuarios = _getUsuarios();
      let listaMuertos = [];
      let sesion = JSON.parse(sessionStorage.getItem('sesion'));
      for( let i=0; i<listaUsuarios.length;i++){
        if(sesion.cedula == listaUsuarios[i].obtenerCedula()){
          if(listaUsuarios[i].obtenerMuertos() != null){
            listaMuertos = listaUsuarios[i].obtenerMuertos();
          }
        }
      }
      return listaMuertos;
}
function _eliminarUsuario(pCedula){
    let listaUsuarios = _getUsuarios();
    for (let i = 0; i < listaUsuarios.length; i++){
      if (listaUsuarios[i].cedula == pCedula) {
        listaUsuarios[i].cambiarEstado('inactivo');
        console.log(listaUsuarios[i].estado);
        console.log(listaUsuarios);
      }  
    }
    localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
  }
  function _activarUsuario(pCedula){
    let listaUsuarios = _getUsuarios();
    for (let i = 0; i < listaUsuarios.length; i++){
      if (listaUsuarios[i].cedula == pCedula) {
        listaUsuarios[i].cambiarEstado('activo');
        console.log(listaUsuarios[i].estado);
        console.log(listaUsuarios);
      }  
    }
    localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
  }

function _getAllMuertos(){
  let listaUsuarios = _getUsuarios();
  let listaMuertos = [];
  for (let i = 0; i < listaUsuarios.length; i++){
    let listaMuertosTemp = listaUsuarios[i].obtenerMuertos();
    if(listaMuertosTemp != []){
      let muertoTemp = {};
      for(let j = 0; j < listaMuertosTemp.length; j++){
        muertoTemp = listaMuertosTemp[j];
        listaMuertos.push(muertoTemp);
      }
    }
  }
  return listaMuertos;
}
    function _actualizarUsuario(pUsuario) {
      let listaUsuarios = _getUsuarios();

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (pUsuario.cedula == listaUsuarios[i].cedula){
          listaUsuarios[i] = pUsuario;
        }
      }
      actualizarLocal(listaUsuarios);
    }

 function actualizarLocal(plistaActualizada) {
     localStorage.setItem('usuariosLS', JSON.stringify(plistaActualizada));
   }



  function _addFiesta(pMuerto, pFiesta){
    let listaUsuarios = _getUsuarios();
    let fiesta = {};
    
    for(let i = 0; i < listaUsuarios.length; i++){
          
      for(let j=0 ;j < listaUsuarios[i].obtenerMuertos().length; j++){

        if(listaUsuarios[i].obtenerMuertos()[j].obtenerInfoMuerto().apodo == pMuerto.obtenerInfoMuerto().apodo){
          listaUsuarios[i].obtenerMuertos()[j].registrarFiesta(pFiesta);
          fiesta = listaUsuarios[i].obtenerMuertos()[j];
          console.log('Registro fiesta completo', listaUsuarios[i].obtenerMuertos()[j]);
        }
      }
    }
    console.log(listaUsuarios);
    actualizarLocal(listaUsuarios);
    console.log(listaUsuarios);
    return fiesta;
  }

  function _addRetoques(pMuerto, pRetoque){
    let listaUsuarios = _getUsuarios();
    let listaVehiculos = [];
    let listaRetoques = {};
    
    for(let i = 0; i < listaUsuarios.length; i++){
      
      
      for(let j=0 ;j < listaUsuarios[i].obtenerMuertos().length; j++){
       
        
        if(JSON.stringify(listaUsuarios[i].obtenerMuertos()[j].obtenerInfoMuerto()) == JSON.stringify(pMuerto.obtenerInfoMuerto())){

         
          listaUsuarios[i].obtenerMuertos()[j].agregarRetoqueaMuerto(pRetoque);
          listaRetoques = listaUsuarios[i].obtenerMuertos()[j];
          console.log('Registro retoque completo', listaUsuarios[i].obtenerMuertos()[j]);
        }
      }
    }
    console.log(listaUsuarios);
    actualizarLocal(listaUsuarios);
    console.log(listaUsuarios);
    return listaRetoques;
  }

  


  function actualizarLocal(plistaActualizada){
    localStorage.setItem('usuariosLS', JSON.stringify(plistaActualizada));
  }


  }
})();
