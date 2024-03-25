import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from './environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FIRMA';
  constructor(private router: Router) {
    console.log(environment.actionsURL);
    console.log(environment.lawFirmURL);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificar si la ruta actual es "/login"o "/recover"
        this.isSpecialPage();
      }
    });
  }

  isSpecialPage(): boolean {
    const currentUrl = this.router.url;
    const loginUrl = '/login';
    const recoverUrl = '/recover';

    // Verificar si la ruta actual es "/login" o "/recover"
    if (currentUrl === loginUrl || currentUrl === recoverUrl) {
        return true;
    }

    // Verificar si la ruta contiene "/login" con parámetros de consulta específicos
    if (currentUrl.includes(loginUrl)) {
        const urlTree = this.router.parseUrl(currentUrl);
        const queryParams = urlTree.queryParams;
        // Verificar si existen parámetros de consulta y si tienen el valor correcto
        if (queryParams['returnUrl'] && queryParams['returnUrl'].startsWith('/')) {
          return true;
      }
      
    }

    return false;
}

}
