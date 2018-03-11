// TODO Dentro de este archivo se crean los objetos con sus respectivos métodos

class Cliente{
  constructor(pFoto, pNombre, pApellido, pCedula, pProvincia, pCanton, pDistrito, pUbicacion, pFechaNacimiento, pEdad, pGenero, pNombreUsuario, pContrasenna){
    this.foto = pFoto;
    this.nombre = pNombre;
    this.apellido = pApellido;
    this.cedula = pCedula;
    this.provincia = pProvincia;
    this.canton = pCanton;
    this.distrito = pDistrito;
    this.ubicacion = pUbicacion;
    this.fechaNacimiento = pFechaNacimiento;
    this.edad = pEdad;
    this.genero = pGenero;
    this.nombreUsuario = pNombreUsuario;
    this.contrasenna = pContrasenna;
    this.listaMuertos = [];
    this.estado = 'activo';
  }

  getEstado(){
    return this.estado;
  }
  cambiarEstado(pEstado){
    this.estado = pEstado;
  }
  obtenerMuertos(){
    return this.listaMuertos;
  }
  registrarMuerto(pMuerto){
    this.listaMuertos.push(pMuerto);
  }
  obtenerNombreCompleto(){
    return `${this.nombre} ${this.apellido}`;
  }
  obtenerCedula(){
    return this.cedula;
  }

  obtenerNombreUsuario(){
    return this.nombreUsuario;
  }
  obtenerContrasenna(){
    return this.contrasenna;
  }
}

class Muerto{
  constructor(pApodo,pEdad, pGenero, pTamanno){
    this.apodo = pApodo;
    this.edad = pEdad ;
    this.genero = pGenero;
    this.tamanno = pTamanno;
    this.entierro= '';
    this.listaRetoques=[];
    this.fiesta = [];
  }
  registrarEntierros(pEntierro){
    this.entierro=pEntierro;
  }

  agregarRetoqueaMuerto(pRetoque){
    this.listaRetoques.push(pRetoque);
  }

  getRetoques(){
    return this.listaRetoques;
  }

  registrarFiesta(pFiesta){
    this.fiesta.push(pFiesta);
  }

  obtenerFiesta(){
    return this.fiesta;
  }

  obtenerInfoMuerto(){
    return this;
  }

  obtenerInfoRetoque(){
    return this.listaRetoques;
  }
  
}

class Entierro {
  constructor (pFecha, pHoraInicio, pHoraFin, pPrioridad) {
    this.fecha = pFecha;
    this.horaInicio = pHoraInicio;
    this.horaFin = pHoraFin;
    this.prioridad = pPrioridad;
    this.lugar = '';
  }

  registrarLugar(pLugar){
    this.lugar=pLugar;
  }

}

class Retoques {
  constructor (pId,pNombre,pCosto) {
    this.id = pId;
    this.nombre=pNombre;
    this.costo=pCosto;

}

}

class Fiestas {
  constructor (pFecha, pDuracion, pCosto) {
    this.fecha = pFecha;
    this.duracion = pDuracion;
    this.costo = pCosto;
    this.animador = [];
  }
  registrarAnimador(pAnimador){
    this.animador=pAnimador;
  }
}


class Lugares {
  constructor (pId,pLugar) {
    this.id=pId;
    this.lugar = pLugar;
  }
}

class Animadores {
  constructor (pId, pApodo, pCosto) {
    this.id = pId;
    this.apodo = pApodo;
    this.costo = pCosto;
  }
}
