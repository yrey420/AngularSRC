import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckLoginGuard implements CanActivate {

        constructor(private authsvc: AuthService, private router: Router){}


        canActivate(){
          return this.authsvc.userData$.pipe(map(user=>{
            if (!user){
              alert('no has iniciado sesion para ingresar a ver los registros, por favor registrate o inicia sesion');
              this.router.navigate(['/login']);
              return false;
            }else{
              return true;
            }
          }));
        }


}
