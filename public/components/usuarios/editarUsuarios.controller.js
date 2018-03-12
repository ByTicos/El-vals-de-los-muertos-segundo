(() => {
    'use strict';
    angular
    .module('funeraria')
    .controller('controladorEditarUsuarios', controladorEditarUsuarios);
  
    controladorEditarUsuarios.$inject = ['$stateParams', '$state', '$location','servicioUsuarios'];

    function controladorEditarUsuarios($stateParams, $state, $location,servicioUsuarios){
        let vm = this;

        vm.regresar = () =>{
            $state.go('admin');
        }

        vm.editarUsuario = {};

        let objUsuarioAEditar = JSON.parse($stateParams.objUsuarioTemp);
        let objUsuarioTemp = new Cliente(objUsuarioAEditar.foto, objUsuarioAEditar.nombre, objUsuarioAEditar.apellido, objUsuarioAEditar.cedula, objUsuarioAEditar.provincia,  objUsuarioAEditar.canton,  objUsuarioAEditar.distrito,  objUsuarioAEditar.ubicacion,  objUsuarioAEditar.fechaNacimiento,  objUsuarioAEditar.edad,  objUsuarioAEditar.genero,  objUsuarioAEditar.nombreUsuario,  objUsuarioAEditar.contrasenna,  objUsuarioAEditar.confirmarContrasenna);
        
        vm.editarUsuario.foto = objUsuarioAEditar.foto;
        vm.editarUsuario.nombre = objUsuarioAEditar.nombre;
        vm.editarUsuario.apellido = objUsuarioAEditar.apellido;
        vm.editarUsuario.cedula = objUsuarioAEditar.cedula;
        vm.editarUsuario.provincia = objUsuarioAEditar.provincia;
        vm.editarUsuario.canton = objUsuarioAEditar.canton;
        vm.editarUsuario.distrito = objUsuarioAEditar.distrito;
        vm.editarUsuario.ubicacion = objUsuarioAEditar.ubicacion;
        vm.editarUsuario.fechaNacimiento = new Date(objUsuarioAEditar.fechaNacimiento);
        vm.editarUsuario.edad = objUsuarioAEditar.edad;
        vm.editarUsuario.genero = objUsuarioAEditar.genero;
        vm.editarUsuario.nombreUsuario = objUsuarioAEditar.nombreUsuario;
        vm.editarUsuario.contrasenna = objUsuarioAEditar.contrasenna;


        vm.editUsuario = (pUsuario) =>{
        let listaUsuarios = servicioUsuarios.getUsuarios();
        
        listaUsuarios.forEach(objUsuario => {
            if(objUsuario.cedula == objUsuarioTemp.cedula){
                objUsuario.foto = pUsuario.foto;
                objUsuario.nombre = pUsuario.nombre;
                objUsuario.apellido = pUsuario.apellido;
                objUsuario.cedula = pUsuario.cedula;
                objUsuario.provincia = pUsuario.provincia;
                objUsuario.canton = pUsuario.canton;
                objUsuario.distrito = pUsuario.distrito;
                objUsuario.ubicacion = pUsuario.ubicacion;
                objUsuario.fechaNacimiento = pUsuario.fechaNacimiento;
                objUsuario.edad = pUsuario.edad;
                objUsuario.genero = pUsuario.genero;
                objUsuario.nombreUsuario = pUsuario.nombreUsuario;
                objUsuario.contrasenna = pUsuario.contrasenna;

                servicioUsuarios.actualizarUsuario(objUsuario);
            }
        });
        swal("Edición exitosa", "El usuario ha sido editado correctamente", "success", {
            button: "Aceptar",
          });
        $state.go('admin')
        }

    }
})();