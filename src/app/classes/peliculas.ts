


export class Pelicula {

    private id:string
    private Titulo:string;
    private Autor:string;
    private Genero:string;
    private Duracion:number;
    private Año:Date;
    private Created_At ?: Date;

    constructor(Titulo:string,Autor:string,Genero:string,Duracion:number,año:Date,id:string,Created_At?:Date){
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Genero = Genero;
        this.Duracion = Duracion;
        this.Año = año
        if(Created_At){
        this.Created_At = Created_At;
        }else{
            this.Created_At= new Date()
        }
        this.id = id;
    }

    get ID() {
        return this.id
    }

    get titulo() {
        return this.Titulo
    }

    get autor() {
        return this.Autor
    }

    get genero() {
        return this.Genero
    }

    get duracion() {
        return this.Duracion
    }

    get ano() {
        return this.Año
    }

    get Created() {
        return this.Created_At
    } 

}