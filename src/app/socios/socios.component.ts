import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SociosSheetComponent } from '../socios-form/socios-form.component';
import { personalInfo, Socios, jobInfo } from '../classes/socios';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css'],
})
export class SociosComponent implements OnInit {
  constructor(
    private form: MatBottomSheet,
    private apiCall: ApiCallsService,
    private router: Router
  ) {}

  Socios: Socios[] = [];

  Container: Socios[] = [];

  async openForm() {
    const bottomSheetRef = this.form.open(SociosSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(async (profileForm) => {
      this.apiCall.PostSocios(profileForm.value);
      let newID = (
        parseInt(this.Socios[this.Socios.length - 1].ID) + 1
      ).toString(10);
      this.Socios.push(new Socios(profileForm.value, newID));
    });
  }

  async remove() {
    console.log(this.Container);
    await Promise.all(
      this.Container.map(async (Socio: Socios) => {
        return this.apiCall.deleteSocios(Socio.ID);
      })
    );
    this.Container.forEach((a: Socios) => {
      this.Socios = this.Socios.filter((s) => {
        return s !== a;
      });
    });
  }

  ngOnInit() {
    this.apiCall.getSocios().subscribe((SociosArr: Socios[]) => {
      SociosArr.forEach((Socio: any) => {
        let personalInfo: personalInfo = {
          Nombre: Socio.personalInfo.Nombre,
          Apellidos: Socio.personalInfo.Apellidos,
          Email: Socio.personalInfo.Email,
          FechaDeNacimiento: Socio.personalInfo.FechaDeNacimiento,
          Direccion: Socio.personalInfo.Direccion,
          DNI: Socio.personalInfo.DNI,
          Genero: Socio.personalInfo.Genero,
          NumeroTlf: Socio.personalInfo.NumeroTlf,
        };

        let filmsInfo: jobInfo = {
          Peliculas_alquiladas: Socio.filmsInfo.Peliculas_alquiladas,
          Peliculas_devueltas: Socio.filmsInfo.Peliculas_devueltas,
        };
        let socio = new Socios(personalInfo, Socio.Socios_id, filmsInfo);
        socio.AlquilatedCount();
        socio.DevueltasCount();
        this.Socios.push(socio);
      });

      this.Socios.sort((n1, n2) => parseInt(n1.ID) - parseInt(n2.ID));
    });
  }
}
