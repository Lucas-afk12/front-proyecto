import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { empleados, jobInfo , personalInfo } from '../classes/empleados';
import { ApiCallsService } from '../api-calls.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosSheetComponent } from '../empleados-form/empleados-form.component';

@Component({
  selector: 'app-Empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  constructor(
    private form: MatBottomSheet,
    private apiCall: ApiCallsService,
    private router: Router
  ) {}


  verifyCode = new FormGroup({
    Codigo: new FormControl
  })

  empleados: empleados[] = [];

  verificado = false;

  Container: empleados[] = [];

  async openForm() {
    const bottomSheetRef = this.form.open(EmpleadosSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(async (profileForm) => {
      this.apiCall.PostEmpleados(profileForm.value);
    });
    
  }

  async remove() {
    console.log(this.Container);
    await Promise.all(
      this.Container.map(async (empleado: empleados) => {
        return this.apiCall.deleteEmpleados(empleado.ID);
      })
    );
    this.Container.forEach((empleado: empleados) => {
      this.empleados = this.empleados.filter((s:any) => {
        return s !== empleado;
      });
    });
  }


  ngOnInit(){
    this.apiCall.getEmpleados().subscribe((EmpleadosArr: empleados[]) => {
      EmpleadosArr.forEach((Empleado: any) => {
        let personalInfo: personalInfo = {
          Nombre: Empleado.personalInfo.Nombre,
          Apellidos: Empleado.personalInfo.Apellidos,
          Email: Empleado.personalInfo.Email,
          FechaDeNacimiento: Empleado.personalInfo.FechaDeNacimiento,
          Direccion: Empleado.personalInfo.Direccion,
          DNI: Empleado.personalInfo.DNI,
          Genero: Empleado.personalInfo.Genero,
          NumeroTlf: Empleado.personalInfo.NumeroTlf,
        };

        let jobInfo: any = {
          sueldo: Empleado.jobInfo.sueldo,
          cantidadDeVentas: Empleado.jobInfo.Peliculas_alquiladas,
          Antiguedad: 0,
          plus: 0
        };

        let Empleados = new empleados(personalInfo, jobInfo,"empleados",Empleado.Empleado_id);
        console.log(Empleado)
        console.log(Empleados)
        this.empleados.push(Empleados);
      });

      this.empleados.sort((n1, n2) => parseInt(n1.ID) - parseInt(n2.ID));
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
