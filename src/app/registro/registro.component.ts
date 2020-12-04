import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup, RequiredValidator, Validators, AbstractControl, ValidationErrors, AsyncValidator, Validator, AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {MatChipInputEvent, MatChipRemove} from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';
import { Usuario} from '../models/usuario.model';
import { DataBaseService} from  '../services/data-base.service';
import { APIRestMunicipiosService} from  '../services/APIRest/apirest-municipios.service';
import { Router } from '@angular/router';
import { ThemePalette} from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { map, take, debounceTime, startWith, timeout} from 'rxjs/operators';
import { Municipio} from '../interfaces/datos/municipio';





export interface Fruta{
  name:string;
}
export interface Habilidad{
  nombre:string;
  checked:boolean;
  checkeable:boolean;

}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers:[]
})


export class RegistroComponent implements OnInit {
  public users: Usuario[]= [];


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
  async ngOnInit(){

    //lenar el arreglo con los municipios
    this.datosSvc.getAll().subscribe(res =>{
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
      this.users = res;
      //esto comentado es para poner el validator con la bd local (se esta usando metodo en el cambio)
      //console.log(this.users);
      //this.registerForm.get('cc').setValidators(validatorCC(this.users));
      //this.registerForm.get('email').setValidators(validatorMail(this.users));
    });

    //filtro departamentos y ciudades
    this.opcionesFiltradas = this.registerForm.get('dept').valueChanges.pipe(
      startWith(''),
      map(value=>
         this.filtroDept(value)
        ),);
    this.opcionesFiltradasCiudad = this.registerForm.get('ciudad').valueChanges.pipe(
      startWith(''),
      map(value=>
         this.filtroCiudad(value))
    );

  }



  //arreglo de habilidades (el checkeable es el desahilitador de los checkbox)
  public habilidades:Array<Habilidad> = [
    {nombre: 'Proactividad', checked: false, checkeable: false},
    {nombre: 'Disciplina', checked: false, checkeable: false},
    {nombre: 'Diligente', checked: false, checkeable: false},
    {nombre: 'Estratégico', checked: false, checkeable: false},
    {nombre: 'Calmado', checked: false, checkeable: false},
    {nombre: 'Orientación', checked: false, checkeable: false},
    {nombre: 'Investigador', checked: false, checkeable: false},
    {nombre: 'Pensamiento Logaritmico', checked: false, checkeable: false},
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



//creamos nuestro grupo del form
 registerForm= new FormGroup({
  nombre: new FormControl(''),
  apellido:new FormControl(''),
  cc:new FormControl('',[]),
  email:new FormControl('', [Validators.email, validatorMail(this.users)]),
  fechaN:new FormControl(''),
  direccion:new FormControl(''),
  pais:new FormControl(''),
  dept:new FormControl('', Validators.required),
  ciudad:new FormControl('', Validators.required),
  postal: new FormControl(''),
  profes: new FormControl(''),
  //skills: new FormControl(''),
  descript:new FormControl(''),
  checked: new FormControl(''),
 },);
 //creamos el contador del limite de caracteres de la descripcion
 caracteres: number = 500;



  constructor(private db: DataBaseService, private router: Router, public dialog:MatDialog, private datosSvc: APIRestMunicipiosService) {
   }



   conteo(){ //metodo para llevar el recuento de caracteres escritos
     const escrito = this.registerForm.get('descript').value;
     console.log(escrito.length);
     this.caracteres = 500 - escrito.length ;
     console.log('form->'+this.registerForm.errors);
   }


  onChange(t?:Habilidad){
    console.log('form ->', this.registerForm);

 //metodo para registrar la habilidad en el momento que esta sea checkeada

    const bool = this.registerForm.get('checked').value;
    if (bool){
      this.seleccionados++;
      console.log(this.seleccionados);
      if (this.seleccionados==3){
      this.habilidades.forEach(element => {
        if (element.nombre == t.nombre){
          element.checked = true;
        }
        if (element.checked == false){
          element.checkeable = true
        }
      });
      console.log(this.habilidades);
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





  async onRegister(){//boton registrar
    //obtenemos datos del formGroup
    const {nombre, apellido, cc, email, fechaN, direccion, pais, dept, ciudad, postal, profes, descript} = this.registerForm.value;


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
    user.email = email;
    user.fecha = fechaN;
    user.direccion = direccion;
    user.pais = pais;
    user.ciudad = ciudad;
    user.codigo_postal = postal;
    user.profesion = profesiones;
    user.habilidades = habs;
    user.descripcion = descript;
    user.departamento = dept;
    user.urlImagen = "https://firebasestorage.googleapis.com/v0/b/marvel-project-95aea.appspot.com/o/perfil%2Fundefined.png?alt=media&token=90885b14-0f25-419e-925d-de4fff382264";

//incializamos el modal como un dialogo
    var modal= this.dialog.open(dialogComponent);
    //agregamos el usuario a la db
      await this.db.crearUsuario(user).then(rta=>{
        debounceTime(500);

      console.log('registro', rta);
      if (rta){
        modal;
        timeout(4500);
        //alert('Usuario registrado satisfactoriamente');
        window.location.reload();
      }
    });
  }

  //Validacion del email por metodo asyncrono con la db
  async validarEmail(){
    const correo = this.registerForm.get('email');
    //this.registerForm.controls['email'];
    const existe = await this.db.buscarUsuario(correo.value);
    existe.get().subscribe(function(doc){
      if (doc.exists){
        alert('usuario ya registrado');
        correo.setValue('');
    } else {
      console.log("No such document!");
      }
    });
  }
  //Validacion de la cc por metodo con la bd quemada localmente
  validarCC(){
    const correo = this.registerForm.get('cc');
    //this.registerForm.controls['email'];
    this.users.forEach(usuario=>{
      if (usuario.cc==correo.value){
        alert('cedula ya registrada');
        correo.setValue('');
      }else {
        console.log("No such cc!");
        }
    });
  }
  //Validacion de email por metodo con la bd quemada localmente
  validarMail(){
    const correo = this.registerForm.get('email');
    //this.registerForm.controls['email'];
    this.users.forEach(usuario=>{
      if (usuario.email==correo.value){
        alert('email ya se encuentra registrado');
        correo.setValue('');
      }else {
        console.log("No such email!");
        }
    });
  }




}
  //validators asyncronos de email
export class CustomValidatorEmail{
  static userEmail(db: DataBaseService){
    return (control:AbstractControl)=>{
      const username = control.value/*.toLowerCase()*/;
      debounceTime(500);
      return db.firebase.collection('usuarios', ref => ref.where('email', '==', username)).get().pipe(
      map(users =>
        users.empty ? null:{'emailregistrado':true}
      ));
  }
}
}
//validators asyncronos de email
export class CustomValidatorCC{
static userCC(db: DataBaseService){
  return (control:AbstractControl) =>{
    const username = control.value;
    return db.firebase.collection('usuarios', ref => ref.where('cc', '==', username)).get().pipe(
    debounceTime(500),
    map(users =>
      users.empty ? null:{'cc registrada':true}
    ));
}
}
}
@Component({
  selector:'dialog-component',
  templateUrl:'dialog-component.html'
})
export class dialogComponent{


}
//Forma del validator con la bd local de email
export class CusValidatorCC{
  static userCC(db: Usuario[]){
    return (control:AbstractControl) =>{
      if (db!=undefined && db.includes(control.value)){
        console.log('val'+db);
        return  {ccExiste:true};
      }
      return null;
  }
  }
  }
//Forma de la funcion validator con la bd local de email
export function validatorMail(db:Usuario[]):ValidatorFn {
  return (control:AbstractControl): {[key:string]:any}|null =>{
    db.forEach(usuario=>{
      if (usuario.email==control.value){
        alert('Email ya registrado');
        return {emailExiste:true};
      }
    });
    return null;
  }

}
//Forma de la funcion validator con la bd local de cc
export function validatorCC(db:Usuario[]):ValidatorFn {
  return (control:AbstractControl): {[key:string]:any}|null =>{
      db.forEach(usuario=>{
      if (usuario.cc==control.value){
        alert('cedula ya registrada');
        return {cedulaExiste:true};
      }
    });
    return null;
  }

}
