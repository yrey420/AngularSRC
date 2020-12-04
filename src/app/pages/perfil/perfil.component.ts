      import { Component, OnInit } from '@angular/core';
      import {MatDialog} from '@angular/material/dialog';
      import {ModalComponent} from '../../componentes/modal/modal.component';
      import { FormGroup, FormControl, Validators} from '@angular/forms';
      import { AuthService} from '../../services/auth/auth.service';
      import { Usuario} from '../../models/usuario.model';
      import { AngularFireStorage } from '@angular/fire/storage';
      import { DataBaseService } from 'src/app/services/data-base.service';
      import {DatePipe } from  '@angular/common';
      import { first } from 'rxjs/operators';



      export interface Habilidad{
        nombre:string;
        checked:boolean;
        checkeable:boolean;
      }

      @Component({
        selector: 'app-perfil',
        templateUrl: './perfil.component.html',
        styleUrls: ['./perfil.component.scss']
      })

      export class PerfilComponent implements OnInit {
        public users= new Usuario();
        perfilForm = new FormGroup({
          nombre: new FormControl({value:'', disabled:true}),
          apellido:new FormControl({value:'', disabled:true}),
          cc:new FormControl({value:'', disabled:true},[]),
          email:new FormControl({value:'', disabled:true}, [Validators.email]),
          fechaN:new FormControl({value:'', disabled:true}),
          direccion:new FormControl({value:'', disabled:true}),
          pais:new FormControl({value:'', disabled:true}),
          dept:new FormControl({value:'', disabled:true}, Validators.required),
          ciudad:new FormControl({value:'', disabled:true}, Validators.required),
          postal: new FormControl({value:'', disabled:true}),
          profes: new FormControl({value:'', disabled:true}),
          //skills: new FormControl(''),
          descript:new FormControl({value:'', disabled:true}),
          checked: new FormControl({value:'', disabled:true,}),
        });
        public user:any;

        public imgurl:string;

        public habilidades = [];
        public profesiones = [];

        constructor(public dialog: MatDialog, private storage: AngularFireStorage, private authSvs: AuthService, private db:DataBaseService) { }

        async ngOnInit() {
            this.user = await this.authSvs.afAuth.authState.pipe(first()).toPromise() ;
            const date = new DatePipe('en_US');
            (await this.db.busquedaEmail(this.user.email)).subscribe(res=>{
            this.users = res[0];
            const thedate= this.users.fecha.valueOf();
            //MARCA ERROR pero no quitarloooo!!!!!!!!!!!!!!!!!!!!!
            //console.log(this.users.fecha.seconds);
            //const fechaF = 12;
            const fechaF = date.transform( this.users.fecha['seconds']*1000 , 'dd/MM/yyyy');//NO QUITARLOOOOOOOOOOOOOO
            //NO QUITARLOOOOOOOOOOOOOOOOOOOO!!!!!!!!!
            //NO QUITARLOOOOOOOOOOOOOOOOOOOO!!!!!!!!!
            console.log(fechaF)
                this.perfilForm.get('nombre').setValue(this.users.nombres);
                this.perfilForm.get('apellido').setValue(this.users.apellidos);
                this.perfilForm.get('cc').setValue(this.users.cc);
                this.perfilForm.get('email').setValue(this.users.email);
                this.perfilForm.get('fechaN').setValue(fechaF);
                this.perfilForm.get('direccion').setValue(this.users.direccion);
                this.perfilForm.get('pais').setValue(this.users.pais);
                this.perfilForm.get('dept').setValue(this.users.departamento);
                this.perfilForm.get('ciudad').setValue(this.users.ciudad);
                this.perfilForm.get('postal').setValue(this.users.codigo_postal);
                this.profesiones = this.users.profesion;
                this.perfilForm.get('descript').setValue(this.users.descripcion);
                this.habilidades = this.users.habilidades;
                this.perfilForm.get('checked').updateValueAndValidity();
                this.imgurl = this.users.urlImagen;
              }
            );
        }
        onRegister(){
          this.dialog.open(ModalComponent);
        }

      }
