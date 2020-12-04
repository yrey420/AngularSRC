import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first, map, timeout, debounceTime } from 'rxjs/operators';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
      export class AuthService {
        public userData$ : Observable<firebase.User>;
        public user:any;
        public usuario$:Usuario;

        constructor(public afAuth:AngularFireAuth, private db:DataBaseService, private router:Router) {
          this.userData$ = afAuth.authState;
          this.user = this.afAuth.authState.pipe(first()).toPromise();
        }
        async inciando(email:string){
            const actionCodeSettings = {
              //url: 'http://localhost:4200/login',
              url: 'https://marvel-project-95aea.web.app/login',
              handleCodeInApp: true,

            };
            try {
              await this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
              window.localStorage.setItem('emailForSignIn', email);
              alert('Por favor inicia sesion ingresando al link que hemos enviado a tu correo electronico');
              window.location.reload();
              //alert(this.userData$);
              return true;
            } catch (error) {
              console.log(error);
            }

        }
        async login(email:string){
          var bandera = false;
          (await this.db.obtenerUsuarios()).subscribe(res=>{
            res.forEach(usuario =>{
              if (usuario.email == email){
                this.usuario$ = usuario;
                this.inciando(email);
                bandera = true;
              }
            });
            console.log(bandera);
            if (!bandera){
              alert('email no registrado');
            }
          });

        }
        async confirmSignIn(url){
          var bandera = false;
          this.userData$.pipe(map(user=>{
            if (user){
              bandera = true;
            }
          }));
          if  (!bandera){
          try {
            if (this.afAuth.isSignInWithEmailLink(url)){
              console.log('YES');
              let email = window.localStorage.getItem('emailForSignIn');
              if (!email){
                //email = window.prompt('Por favor ingresa un email para iniciar sesion');
                //alert('Por favor ingrese con un email ya registrado');
              }
              const result = await this.afAuth.signInWithEmailLink(email, url);
              window.localStorage.removeItem('emailForSignIn');
              this.router.navigate(['/home']);
            }
          } catch (error) {

          }
        }
        }
        async logout(){
          try {
            await this.afAuth.signOut();
          } catch (error) {
            console.log(error);
          }
        }
      }
