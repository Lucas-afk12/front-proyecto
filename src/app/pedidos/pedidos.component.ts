import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { empleados, jobInfo , personalInfo } from '../classes/empleados';
import { ApiCallsService } from '../api-calls.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidoSheetComponent } from '../pedidos-form/pedidos-form.component';
import { pedidos } from '../classes/pedidos';

@Component({
  selector: 'app-Empleados',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
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

  Container: pedidos[] = [];

  pedidos: pedidos[] = [];

  async openForm() {
    const bottomSheetRef = this.form.open(PedidoSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(async (profileForm) => {
    
      let newID = "0"
      if (this.pedidos.length === 0) {newID="0"}else{newID = (parseInt(this.pedidos[this.pedidos.length - 1].ID) + 1
        ).toString(10);}
      let pedido = new pedidos(profileForm.value.Socio,profileForm.value.Pelicula,profileForm.value.Empleado,profileForm.value.Tiempo,newID,false)
      this.pedidos.push(pedido)
      await this.apiCall.postPedido(pedido);
    });
  }

  async remove() {
    console.log(this.Container);
    await Promise.all(
      this.Container.map(async (pedido: pedidos) => {
        return this.apiCall.deletePedido(pedido.ID,pedido.socio);
      })
    );
    this.Container.forEach((pedido: pedidos) => {
      this.pedidos = this.pedidos.filter((s:any) => {
        return s !== pedido;
      });
    });
  }

  async devuelto() {
    await Promise.all(
      this.Container.map(async (pedido) => {
        return this.apiCall.devueltoPedido(pedido.ID,pedido.socio);
      })
    )
    this.Container.forEach((pedido)=>{
      this.pedidos.forEach((pedido2)=>{
        if (pedido.ID == pedido2.ID){
          pedido2.devuelto = true;
        }
      })
    })
  }


  ngOnInit(){
    this.apiCall.getPedido().subscribe((pedidosArr: pedidos[]) => {
      pedidosArr.forEach((pedido: any) => {
        console.log(pedido)
       let pedi = new pedidos(pedido.Socio,pedido.Pelicula,pedido.Empleado,pedido.Tiempo,pedido.id,pedido.devuelto,pedido.createdAt)
       this.pedidos.push(pedi);
       console.log(pedi)
      });
      this.pedidos.sort((n1, n2) => parseInt(n1.ID) - parseInt(n2.ID));
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
