import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { SesionService } from '../servicios/sesion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {

  constructor(
    private servicioSesion: SesionService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: string | null = localStorage.getItem('token');
      if(token){
        const jwt: JwtHelperService = new JwtHelperService();
        if(jwt.isTokenExpired(token)){
          localStorage.removeItem('token');
          return this.router.createUrlTree(['/login']);
        }else{
          return true;
        }
      }else{
        return this.router.createUrlTree(['/login']);
      }
  }

}
