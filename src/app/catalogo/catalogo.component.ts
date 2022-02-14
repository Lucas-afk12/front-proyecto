import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { empleados, jobInfo , personalInfo } from '../classes/empleados';
import { ApiCallsService } from '../api-calls.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogoSheetComponent } from '../catalogo-form/catalogo-form.component';
import { Pelicula } from '../classes/peliculas';

@Component({
  selector: 'app-Empleados',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  constructor(
    private form: MatBottomSheet,
    private apiCall: ApiCallsService,
    private router: Router
  ) {}


  verifyCode = new FormGroup({
    Codigo: new FormControl
  })

  Peliculas: Pelicula[] = [];

  verificado = false;

  Container: Pelicula[] = [];

  async openForm() {
    const bottomSheetRef = this.form.open(CatalogoSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(async (profileForm) => {
      this.apiCall.postPelicula(profileForm.value);
      let newID = (
        parseInt(this.Peliculas[this.Peliculas.length - 1].ID) + 1
      ).toString(10);

      let fecha = new Date(`${profileForm.value.año}-${profileForm.value.mes}-${profileForm.value.dia}`)
      this.Peliculas.push(new Pelicula(profileForm.value.Titulo,profileForm.value.Autor,profileForm.value.Genero,profileForm.value.Duracion,fecha,newID));
    });
    
  }

  async remove() {
    console.log(this.Container);
    await Promise.all(
      this.Container.map(async(pelicula: Pelicula) => {
        return this.apiCall.deletePeliculas(pelicula.ID);
      })
    );
    this.Container.forEach((pelicula: Pelicula) => {
      this.Peliculas = this.Peliculas.filter((s:any) => {
        return s !== pelicula;
      });
    });
  }


  ngOnInit(){
    this.apiCall.getPeliculas().subscribe((PeliculasArr: Pelicula[]) => {
      PeliculasArr.forEach((Peliculas: any) => {
        let pelicula = new Pelicula(Peliculas.Titulo,Peliculas.Autor,Peliculas.Genero,Peliculas.Duracion,Peliculas.Año,Peliculas.id,Peliculas.Created_At)
        this.Peliculas.push(pelicula)
      });

      this.Peliculas.sort((n1, n2) => parseInt(n1.ID) - parseInt(n2.ID));
      console.log(this.Peliculas)
    })
}  

logIn(){  
  this.apiCall.verifyEmpleados(this.verifyCode.value.Codigo).subscribe((verify)=>{
    if (verify){
      this.verificado = true
    }
  });
}


}
