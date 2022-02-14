import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';
import { Socios } from '../classes/socios';
import { empleados } from '../classes/empleados';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css'],
})
export class PedidoSheetComponent implements OnInit{
  @Output() usuarioSeleccionado = new EventEmitter();


  Socios : any[] = []
  Empleados : any[] = []
  peliculas: any[] = []

  profileForm = new FormGroup({
    Socio: new FormControl(''),
    Pelicula: new FormControl(''),
    Empleado: new FormControl(''),
    Tiempo: new FormControl(''),
   
  });

  constructor(private bottomsheet: MatBottomSheet, private apiCall: ApiCallsService,) {}

  async onSubmit() {
    await this.bottomsheet.dismiss(this.profileForm);
  }

 async ngOnInit() {

     this.apiCall.getEmpleados().subscribe((res) => { this.Empleados = res; console.log(res); });
      this.apiCall.getSocios().subscribe((res)=> {this.Socios = res  ;console.log(res)});
      this.apiCall.getPeliculas().subscribe((res)=> {this.peliculas = res  ;console.log(res)});

    console.log(this.Socios)
    console.log(this.Empleados)
  }
}
