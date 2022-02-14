import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css'],
})
export class EmpleadosSheetComponent {
  @Output() usuarioSeleccionado = new EventEmitter();

  profileForm = new FormGroup({
    Nombre: new FormControl(''),
    Apellidos: new FormControl(''),
    Email: new FormControl(''),
    dia: new FormControl(''),
    mes: new FormControl(''),
    año: new FormControl(''),
    DNI: new FormControl(''),
    Direccion: new FormControl(''),
    genre: new FormControl(''),
    NumeroTlf: new FormControl(''),
    Sueldo:new FormControl(''),
  });

  constructor(private bottomsheet: MatBottomSheet) {}

  async onSubmit() {
    await this.bottomsheet.dismiss(this.profileForm);
  }
}
