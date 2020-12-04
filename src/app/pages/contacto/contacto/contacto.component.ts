import { Component, OnInit } from '@angular/core';
import { RequiredValidator, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Contactanos } from 'src/app/models/contacto/contactanos.model';
import { DataBaseService}  from '../../../services/data-base.service';
import '../../../../assets/js/smtp.js';
declare let Email: any;


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})

export class ContactoComponent implements OnInit {
  contactanosForm= new FormGroup({
    nombre: new FormControl(''),
    email:new FormControl('', [/*Validators.email*/,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    motivo: new FormControl(''),
    mensaje: new FormControl(''),
   },);

   motivos=['Contratos', 'Proyectos', 'Cobranzas'];



  constructor(private db: DataBaseService) {

  }

  ngOnInit(): void {
  }
  change(){
    console.log(this.contactanosForm);
  }
  //servidor de correos Elasticemail
  enviar(){
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'dev17@aiatic.com',
      Password: '78DD7B3EF6FAE8F0CD0DE010FA103E7C4BF8',
      To: 'dev17@aiatic.com',
      From: 'dev17@aiatic.com',
      Subject: 'hola hola',
      Body: 'Probando 1 2 3....'
    }).then(message =>{
      alert('m'+ message);
    });
  }

  guardar(){
    const {nombre, email, motivo, mensaje} = this.contactanosForm.value;
    const asunto:string = 'Nos ha contactado '+nombre+' desde Marvel-Project';
    const cuerpo:string = '<table style="width: 900px; margin: auto; border: 1px solid black; table-layout: fixed;"><tr>      <th colspan="2" style="border-bottom: 1px solid black;border-collapse: collapse;">        Contacto desde Marvel-Project      </th>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Nombre:</td>      <td style=" border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+nombre+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Correo electronico:</td>      <td style="border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+email+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Motivo:</td>      <td style="border-bottom: 1px solid black;  border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+motivo+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-collapse: collapse;  text-align: justify;">Mensaje:</td>      <td style="border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+mensaje+'</td>    </tr>  </table>';
    var datos = new Contactanos();
    datos.nombre = nombre;
    datos.email = email;
    datos.motivo = motivo;
    datos.mensaje = mensaje;
    this.db.crearContactanos(datos).then(r=>{
      if (r){
        Email.send({
          Host: 'smtp.elasticemail.com',
          Username: 'dev17@aiatic.com',
          Password: '78DD7B3EF6FAE8F0CD0DE010FA103E7C4BF8',
          To: 'ceo@aiatic.com',
          From: 'dev17@aiatic.com',
          Subject: asunto,
          Body: cuerpo
        }).then(message =>{
          alert('m'+ message);
        });
        console.log('si');
      }else{
        console.log('no');
      }
    });
  }

}
