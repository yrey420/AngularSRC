import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireList} from '@angular/fire/database';
import { Usuario } from '../models/usuario.model';//importamos el modelo usuario
import { Contactanos} from '../models/contacto/contactanos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(public firebase: AngularFirestore) {
    this.usersCollection = firebase.collection<Usuario>('usuarios');
    this.users = this.usersCollection.valueChanges();
   }
  private usersCollection: AngularFirestoreCollection<Usuario>;
  private users: Observable<Usuario[]>;
  async updateUser(usuario : Usuario, email : string){
    var res = false;
    await this.firebase.collection('usuarios').doc(email).update({
      nombres:usuario.nombres,
      apellidos: usuario.apellidos,
      cc: usuario.cc,
      email: usuario.email,
      fecha: usuario.fecha,
      direccion: usuario.direccion,
      ciudad: usuario.ciudad,
      pais: usuario.pais,
      codigo_postal: usuario.codigo_postal,
      profesion: usuario.profesion,
      habilidades: usuario.habilidades,
      descripcion: usuario.descripcion,
      departamento: usuario.departamento,
      urlImagen: usuario.urlImagen,
  }).then(function() {
    res = true;
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
if (res){
  window.alert('Tus cambios se han guardado satisfactoriamente');
}
}

  async crearUsuario(usuario: Usuario){

        return await this.firebase.collection('usuarios').doc(usuario.email).set({
        nombres:usuario.nombres,
        apellidos: usuario.apellidos,
        cc: usuario.cc,
        email: usuario.email,
        fecha: usuario.fecha,
        direccion: usuario.direccion,
        ciudad: usuario.ciudad,
        pais: usuario.pais,
        codigo_postal: usuario.codigo_postal,
        profesion: usuario.profesion,
        habilidades: usuario.habilidades,
        descripcion: usuario.descripcion,
        departamento: usuario.departamento,
        urlImagen: usuario.urlImagen,
      }).then(function(rta){
        return true;
      }).catch(function(error){
        return false;
      });

  }
  deleteUsuario(email:string){
    return this.firebase.collection("usuarios").doc(email).delete();
  }

  buscarUsuario(email?:string){
    var rta = this.firebase.collection("usuarios").doc(email);
    var docRef = this.firebase.collection("usuarios").doc(email).get().subscribe(function(doc){
      if (doc.exists){
        //console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    return rta;


/*docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});*/
  }
  async busquedaEmail(dato:string){
    return await this.firebase.collection('usuarios', ref => ref.where('email', '==', dato) /*ref.where('email', '>=', searchValue).where('email','<=',searchValue + '/uf8ff')*/).valueChanges();
    //return await this.firebase.collection('usuarios', ref => ref.where('email', '==', dato));
  }

  async obtenerUsuarios(){

    //return this.firebase.collection('usuarios').valueChanges();
    return await this.users;

  }
  async crearContactanos(contactanos:Contactanos){
    return await this.firebase.collection('contacto').add({
      nombre: contactanos.nombre,
      email: contactanos.email,
      motivo: contactanos.motivo,
      mensaje: contactanos.mensaje,
    }).then(function(rta){
      console.log("ID del doc", rta.id);
      return true;
    }).catch(function(error){
      return false;
    });
  }
}
