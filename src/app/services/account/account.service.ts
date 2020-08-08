import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/app/model/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  getUsuario(uid: string): Observable<any>{
    let itemDoc = this.afs.doc<any>(`usuarios/${uid}`);
    return itemDoc.valueChanges();
  }

  async updateUsuario(usuario: Usuario){

    try{

      const refUser =  this.afs.collection("usuarios")
      const param = JSON.parse(JSON.stringify(usuario));
      refUser.doc(usuario.uid).set(param)


      const user = await this.afAuth.currentUser;

      await user.updateProfile({
        displayName: usuario.nombre + "" + usuario.apellido,
        photoURL: usuario.photoURL,      
        
      });

      return true

    }catch(error){

      return false

    }
    
  }




}
