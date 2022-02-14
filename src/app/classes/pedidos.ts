import { dateFormat } from "highcharts"

export class pedidos {
    private id: string
    private Socio : string
    private Pelicula: string
    private Empleado: string
    private Tiempo: number
    private createdAt ?: Date 
    devuelto: boolean 
    precio:number

    constructor(Socio:string, Pelicula: string , Empleado : string , Tiempo: number, id:string ,devuelto:boolean,createdAt?:Date){
        this.Socio = Socio;
        this.Pelicula = Pelicula;
        this.Empleado = Empleado;
        this.Tiempo = Tiempo;
        this.id = id;
        this.createdAt = createdAt;
        this.devuelto = devuelto;
        this.precio = Tiempo * 2.20
        if(createdAt){
            this.createdAt = createdAt
        }else{
            this.createdAt = new Date();
        }
    }

    get ID() {
        return this.id
    }

    get socio() {
        return this.Socio
    }

    get pelicula() {
        return this.Pelicula
    }

    get empleado() {
        return this.Empleado
    }
    
    get tiempo() {
        return this.Tiempo
    }

    get created() { 
        return this.createdAt
    }

}