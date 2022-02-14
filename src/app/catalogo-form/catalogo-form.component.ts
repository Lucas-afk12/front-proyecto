import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './catalogo-form.component.html',
  styleUrls: ['./catalogo-form.component.css'],
})
export class CatalogoSheetComponent {
  @Output() usuarioSeleccionado = new EventEmitter();

  profileForm = new FormGroup({
    Titulo: new FormControl(''),
    Autor: new FormControl(''),
    Genero: new FormControl(''),
    dia: new FormControl(''),
    mes: new FormControl(''),
    año: new FormControl(''),
    Duracion: new FormControl(''),
  });

  constructor(private bottomsheet: MatBottomSheet) {}

  async onSubmit() {
    await this.bottomsheet.dismiss(this.profileForm);
  }
}
