import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';
import { Socios } from '../classes/socios';
import { HttpClient } from '@angular/common/http';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './socios-form.component.html',
  styleUrls: ['./socios-form.component.css'],
})
export class SociosSheetComponent {
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
  });

  constructor(private bottomsheet: MatBottomSheet) {}

  async onSubmit() {
    await this.bottomsheet.dismiss(this.profileForm);
  }
}
