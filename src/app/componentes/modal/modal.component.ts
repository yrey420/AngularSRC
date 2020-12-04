import { Component, OnInit, Inject, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { finalize, timeout, debounceTime, map, startWith, first } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Municipio} from '../../interfaces/datos/municipio';
import { APIRestMunicipiosService} from '../../services/APIRest/apirest-municipios.service';

      export interface Habilidad{
        nombre:string;
        checked:boolean;
        checkeable:boolean;
      }
      export interface Fruta{
        name:string;
      }
      @Component({
        selector: 'app-modal',
        templateUrl: './modal.component.html',
        styleUrls: ['./modal.component.scss']
      })



      export class ModalComponent implements OnInit {


        constructor(
          public dialog:MatDialogRef<ModalComponent>,
          //@Inject(MAT_DIALOG_DATA) public message: string,
          private storage: AngularFireStorage,
          private authSvs: AuthService,
          private db:DataBaseService,
          private datosSvc: APIRestMunicipiosService
          ) { }
          @ViewChild('imageuser') inputImageUser: ElementRef;

          public users= new Usuario();

          perfilForm = new FormGroup({
          nombre: new FormControl({value:'',}),
          apellido:new FormControl({value:this.users?.apellidos, }),
          cc:new FormControl({value:'',},[]),
          email:new FormControl({value:'',disabled:true}, [Validators.email]),
          fechaN:new FormControl({value:'', }),
          direccion:new FormControl({value:'', }),
          pais:new FormControl({value:'', }),
          dept:new FormControl({value:'',}, Validators.required),
          ciudad:new FormControl({value:'', }, Validators.required),
          postal: new FormControl({value:'',}),
          //skills: new FormControl(''),
          descript:new FormControl({value:'',}),
          imgperfil: new FormControl({value:'',}),
        });
        public user:any;
        public usuarios:Usuario[];


        urlImage: Observable<string>;
        porcentaje: Observable<number>;
        public urlimg:string='';


        //arreglo de habilidades (el checkeable es el desahilitador de los checkbox)
        public habilidades:Array<Habilidad> = [
          {nombre: 'Proactividad', checked: false, checkeable: false},
          {nombre: 'Disciplina', checked: false, checkeable: false},
          {nombre: 'Diligente', checked: false, checkeable: false},
          {nombre: 'Estratégico', checked: false, checkeable: false},
          {nombre: 'Calmado', checked: false, checkeable: false},
          {nombre: 'Orientación', checked: false, checkeable: false},
          {nombre: 'Investigador', checked: false, checkeable: false},
          {nombre: 'Pensamiento'+'\n\n'+'Logaritmico', checked: false, checkeable: false},
          {nombre: 'Crítico', checked: false, checkeable: false},
          {nombre: 'Objetivo', checked: false, checkeable: false},
        ];
        seleccionados: number = 0;

          //CHIPS
          visible = true;
          selectable = true;
          removable = true;
          addOnBlur = true;
          readonly separatorKeysCodes: number[] = [ENTER, COMMA];
          frutas: Fruta[]=[];

            add(event: MatChipInputEvent):void{    //agregamos fruta o habilidad
              const input=event.input;
              const value=event.value;

            if((value || '').trim()){
              //if(this.frutas.length<3){
              //this.frutas.push({name:value.trim()});
              this.frutas.push({name:value.trim()});
            //}
            }
              //reset
            if (input) {
              input.value = '';
            }
          }



            remove(fruta: Fruta): void{ // remoooove
              const index= this.frutas.indexOf(fruta);
              if(index>=0){
                this.frutas.splice(index, 1);
              }

            }
        //fin de los CHIPS


        //array de municipios
        public datos : Municipio[] =[];
        //array de departamentos sin repetir
        public dptos : Municipio[] =[];
        //array de ciudades segun el departamento elegido
        public ciudades : Municipio[] = [];
        public opcionesFiltradas: Observable<Municipio[]>;
        public opcionesFiltradasCiudad: Observable<Municipio[]>;
        selectDept(departamento:String){
          this.datos.forEach(muni=>{
            if (muni.departamento.toLowerCase() == departamento.toLowerCase()){
              this.ciudades.push(muni);
            }
          });
        }
        filtroDept(value:string):Municipio[]{
          this.selectDept(value);
          const valorFiltro = value.toLowerCase();
          return this.dptos.filter(option=>
            option.departamento.toLowerCase().includes(valorFiltro)
          );
        }
        filtroCiudad(value:string):Municipio[]{
          const valorFiltro = value.toLowerCase();
          if (this.ciudades.length==0){
            return this.datos.filter(option=>
              option.municipio.toLowerCase().includes(valorFiltro)
            );
          }
          return this.ciudades.filter(option=>
            option.municipio.toLowerCase().includes(valorFiltro)
          );
        }

        async ngOnInit() {
            //lenar el arreglo con los municipios
          await this.datosSvc.getAll().subscribe(res =>{
            this.datos = res;
            res.forEach(resultado=>{
              var t = 0;
              this.dptos.forEach(obj=>{
                if(obj.departamento==resultado.departamento){
                  t++;
                }
              });
              if (t == 0){
                this.dptos.push(resultado);
              }
            });
            //console.log(this.dptos);
          }
        );
        //obtener lista de usuarios
        (await this.db.obtenerUsuarios()).subscribe(res=>{
          this.usuarios = res;
          //esto comentado es para poner el validator con la bd local (se esta usando metodo en el cambio)
          //console.log(this.users);
          //this.registerForm.get('cc').setValidators(validatorCC(this.users));
          //this.registerForm.get('email').setValidators(validatorMail(this.users));
        });

        //filtro departamentos y ciudades
        this.opcionesFiltradas = this.perfilForm.get('dept').valueChanges.pipe(
          startWith(''),
          map(value=>
            this.filtroDept(value)
            ),);
        this.opcionesFiltradasCiudad = this.perfilForm.get('ciudad').valueChanges.pipe(
          startWith(''),
          map(value=>
            this.filtroCiudad(value))
        );

            this.user = await this.authSvs.afAuth.authState.pipe(first()).toPromise() ;
            const date = new DatePipe('en_US');
            (await this.db.busquedaEmail(this.user.email)).subscribe(res=>{
              this.users = res[0];
              const thedate= this.users.fecha.valueOf();
              //MARCA ERROR pero no quitarloooo!!!!!!!!!!!!!!!!!!!!!
              //console.log(this.users.fecha.seconds);
              //const fechaF = 12;
              //this.fechaF = date.transform( this.users.fecha['seconds'] *1000 ,'dd/MM/yyyy');//NO QUITARLOOOOOOOOOOOOOO
              const fechaF = date.transform( this.users.fecha['seconds'] *1000 ,'yyyy,MM,dd');//NO QUITARLOOOOOOOOOOOOOO
              //NO QUITARLOOOOOOOOOOOOOOOOOOOO!!!!!!!!!
              //NO QUITARLOOOOOOOOOOOOOOOOOOOO!!!!!!!!!
              //console.log(fechaF);
                this.perfilForm.get('nombre').setValue(this.users.nombres);
                this.perfilForm.get('apellido').setValue(this.users.apellidos);
                this.perfilForm.get('cc').setValue(this.users.cc);
                this.perfilForm.get('email').setValue(this.users.email);
                this.perfilForm.get('fechaN').setValue(new Date(fechaF));
                this.perfilForm.get('direccion').setValue(this.users.direccion);
                this.perfilForm.get('pais').setValue(this.users.pais);
                this.perfilForm.get('dept').setValue(this.users.departamento);
                this.perfilForm.get('ciudad').setValue(this.users.ciudad);
                this.perfilForm.get('postal').setValue(this.users.codigo_postal);
                this.perfilForm.get('descript').setValue(this.users.descripcion);
                this.urlimg = this.users.urlImagen;
                this.habilidades.forEach(h1=>{
                  if (this.users.habilidades.includes(h1.nombre)){
                    this.onChange(h1);
                  }
                });
                this.users.profesion.forEach(elemnt=>{
                  this.frutas.push({name:elemnt});
                });

              }
            );
        }

        onChange(t:Habilidad, e?){
        //console.log('form ->', this.perfilForm);
        var bool= true;
      //metodo para registrar la habilidad en el momento que esta sea checkeada
          if(e){
            bool = e.checked;
          }
          if (bool){
            this.seleccionados++;
            if (this.seleccionados==3){
            this.habilidades.forEach(element => {
              if (element.nombre == t.nombre){
                element.checked = true;
              }
              if (element.checked == false){
                element.checkeable = true
              }
            });

          }else{
            this.habilidades.forEach(element => {
              if (element.nombre == t.nombre){
                element.checked = true;
              }
            });
          }
          }else{
            if (this.seleccionados==3){
              this.seleccionados--;
            this.habilidades.forEach(element => {
              if (element.nombre == t.nombre){
                element.checked = false;
              }
              if (element.checked == false){
                element.checkeable = false
              }
            });
            //console.log(this.habilidades);
          }else{
            this.seleccionados--;
            this.habilidades.forEach(element => {
              if (element.nombre == t.nombre){
                element.checked = false;
              }
            });
          }
          }
          //console.log(this.habilidades);

        }

        async onRegister(){
              //obtenemos datos del formGroup
          const {nombre, apellido, cc, email, fechaN, direccion, pais, dept, ciudad, postal, descript, imgperfil} = this.perfilForm.value;
              //tomar los datos de los arrays
              const habs:string [] = [];
              const profesiones: string[] = [];
              this.frutas.forEach(element=>{
                profesiones.push(element.name);
              });
              this.habilidades.forEach(element=>{
                if (element.checked){
                  habs.push(element.nombre);
                }
              });

              //creamos el usuario
              const user = new Usuario();
              user.nombres = nombre;
              user.apellidos = apellido;
              user.cc = cc;
              user.email = this.users.email;
              user.fecha = fechaN;
              user.direccion = direccion;
              user.pais = pais;
              user.ciudad = ciudad;
              user.codigo_postal = postal;
              user.profesion = profesiones;
              user.habilidades = habs;
              user.descripcion = descript;
              user.departamento = dept;
          if (this.file && this.filePath){
          try{
            const ref = this.storage.ref(this.filePath);
            const task = this.storage.upload(this.filePath, this.file);
            this.porcentaje = task.percentageChanges();
            task.then(f=>{
              f.ref.getDownloadURL().then(async l=>{
                    //tomar los datos de los arrays
            //creamos el usuario
          user.urlImagen = l;
          await this.db.crearUsuario(user).then(rta=>{
            debounceTime(500);
          //console.log('registro', rta);
          if (rta){
            timeout(500);
            //alert('Usuario registrado satisfactoriamente');
          window.location.reload();
          }
        });
      });
      });
      //task.snapshotChanges().pipe(finalize(() =>
      //this.urlImage = ref.getDownloadURL())).subscribe();
          } catch (error) {
            console.log(error);
          }
          }else{
          user.urlImagen = this.users.urlImagen;
          await this.db.crearUsuario(user).then(rta=>{
            debounceTime(500);
          //console.log('registro', rta);
          if (rta){
            timeout(500);
            //alert('Usuario registrado satisfactoriamente');
            window.location.reload();
          }
        });
      }
        }
        file:any;
        filePath:any;
        onUploadFoto(e){
          if (e.target.files && e.target.files[0]) {
          //console.log(e.target.files[0]);
          console.log(e.target.files[0].size);
          //if (e.target.files[0].size>99999){
            if(e.target.files[0].size>1042000){
            alert('Archivo no permitido, maximo 1MB');
          }else {
              const id = this.users.email;
              this.file = e.target.files[0];
              this.filePath = 'perfil/'+id+'.png';
        }
        }
        }
          //Validacion de la cc por metodo con la bd quemada localmente
        validarCC(){
          const correo = this.perfilForm.get('cc');
          //this.registerForm.controls['email'];
          if(this.usuarios){
          this.usuarios.forEach(usuario=>{
            if (usuario.cc==correo.value){
              if (correo.value != this.users.cc){
                alert('cedula ya registrada');
                correo.setValue('');
              }

            }else {
              //console.log("No such cc!");
              }
          });
        }
        }
        //Validacion de email por metodo con la bd quemada localmente
        validarMail(){
          const correo = this.perfilForm.get('email');
          //this.registerForm.controls['email'];
          if(this.usuarios){
          this.usuarios.forEach(usuario=>{
            if (usuario.email==correo.value){
              if (correo.value != this.users.email){
                alert('email ya registrada');
                correo.setValue('');
              }
            }else {
              //console.log("No such email!");
              }
          });
        }
        }
        onCancel(){
          //window.location.reload();
          this.dialog.close();
        }

      }
