export class empleados {
  private Empleado_id: string = '0';
  private PersonalInfo: personalInfo;
  private JobInfo: jobInfo;
  private createdAt: Date;
  private tipo: string ;

  constructor(
    personalInfo: personalInfo,
    jobInfo: jobInfo,
    tipo:string,
    Empleado_id?:string,
  ){
    this.PersonalInfo = personalInfo;
    this.JobInfo = jobInfo;
    this.createdAt = new Date();
    if (Empleado_id) {
        this.Empleado_id = Empleado_id;
      }
    this.tipo = tipo
  }

  get ID(){
    return this.Empleado_id
  }

  get personalInfo(){
    return this.PersonalInfo
  }

  get jobInfo(){
    return this.JobInfo
  }

  count(){
    return this.JobInfo.cantidadDeVentas.length
  }

  plus(){
    return this.count()*0.20;
  }

}

export interface personalInfo {
  Nombre: string;
  Apellidos: string;
  Email: string;
  FechaDeNacimiento: Date;
  Direccion: string;
  DNI: string;
  Genero: string;
  NumeroTlf: string;
}

export interface jobInfo {
  sueldo: number;
  cantidadDeVentas: Array<number>;
  Antiguedad: number;
  plus: number
}
