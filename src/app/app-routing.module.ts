import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { estadisticasComponent } from './estadisticas/estadisticas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { SociosComponent } from './socios/socios.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Socios', component: SociosComponent },
  { path: 'Empleados',component: EmpleadosComponent},
  { path: 'Catalogo',component: CatalogoComponent},
  { path: 'Pedidos',component: PedidosComponent},
  { path: 'Estadisticas',component: estadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
}
