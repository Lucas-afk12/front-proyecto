import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiCallsService } from '../api-calls.service';
import { pedidos } from '../classes/pedidos';
import { Socios } from '../classes/socios';

@Component({
  selector: 'app-root',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class estadisticasComponent implements OnInit{


    constructor(
       private apiCall: ApiCallsService,
  
      ) {}

      updateFromInput= false;
    pedidos : pedidos[] = [];
    ganancias : number[] = []
    highcharts = Highcharts;
    chartOptions: any = {   
       chart: {
          type: "spline"
       },
       title: {
          text: "Ganancias Totales"
       },
       xAxis:{
          categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
       },
       yAxis: {          
          title:{
             text:"Dinero:"
          } 
       },
       series: [
          {
             name: 'ganancias',
             data: [0]
          },
       ]
    };

    

    async ngOnInit(){
        this.apiCall.getPedido().subscribe((pedidosArr: pedidos[]) => {
          pedidosArr.forEach((pedido: any) => {
           let pedi = new pedidos(pedido.Socio,pedido.Pelicula,pedido.Empleado,pedido.Tiempo,pedido.id,pedido.devuelto,pedido.createdAt)
            this.pedidos.push(pedi);
            let fecha = new Date(pedido.createdAt)
            let fecha1 = fecha.getMonth() + 1
            console.log(pedido)
            let precio = pedido.precio
            for(let i = 0 ; i<12 ; i++){
                if (i==fecha1){
                   this.ganancias[i] = precio + pedido.precio
                }else{
                    this.ganancias[i] = 0
                }
            }
            
          });
          this.pedidos.sort((n1, n2) => parseInt(n1.ID) - parseInt(n2.ID));
          this.update();
        })
    }  
    
    update(){
        this.chartOptions.series = [{
          data: this.ganancias
        }]
        this.updateFromInput = true;
      }





 }
 