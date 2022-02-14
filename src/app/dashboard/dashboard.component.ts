import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        {
          title: 'Socios',
          cols: 2,
          rows: 1,
          image:
            'https://www.gamecupid.com/sites/default/files/styles/big_banner_980x280/public/games/banners/superstar2.jpg?itok=Y13mR6qC',
          url: '/Socios',
        },
        {
          title: 'Pedidos',
          cols: 1,
          rows: 1,
          image:
            'https://www.diariomotor.com/imagenes/2016/06/initial-d-gt-86-toyota-p.jpg',
          url: '/Pedidos',
        },
        {
          title: 'Estadisticas',
          cols: 1,
          rows: 1,
          image:
            'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/04/stonks-2286073.jpg?itok=Ep3OwEap',
          url: '/Estadisticas',
        },
        {
          title: 'Empleados',
          cols: 1,
          rows: 1,
          image:
            'https://i.pinimg.com/originals/a4/51/0b/a4510bd87d9d7b5016ec05a670dd8f9c.jpg',
          url: '/Empleados',
        },
        {
          title: 'Catalogo',
          cols: 1,
          rows: 1,
          image:
            'https://www.cultture.com/pics/2021/02/trebol-negro-10-cosas-que-no-sabias-sobre-julius-novachrono-7.jpg',
          url: '/Catalogo',
        },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}
  
  goRoute(url: string) {
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
