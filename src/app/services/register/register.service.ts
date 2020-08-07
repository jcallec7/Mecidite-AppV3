import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/login/authentication.service';

@Injectable({
  providedIn: 'root'
})


export class RegisterService {

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private auth: AuthenticationService
) { }

  getRol(uid: string): Observable<any[]>{

    return this.afs.collection("roles",ref => ref.where("uid","==",uid)).valueChanges();

  }

  async checkEmail(email: string){

    return this.afs.collection('usuarios', ref => ref.where("email", "==", email)).valueChanges();

  }

  async insertUsuario(usuario: Usuario, email: string, password: string){

    try{

      const uid = await this.afAuth.createUserWithEmailAndPassword(email, password);
      usuario.uid = uid.user.uid

      const refUser = this.afs.collection("usuarios")
      const param = JSON.parse(JSON.stringify(usuario))
      refUser.doc(usuario.uid).set(param)

      const user = await this.afAuth.currentUser;

      await user.updateProfile({
        displayName: usuario.nombre + "" + usuario.apellido,
        photoURL: user.photoURL || "https://goo.gl/7kz9qG",
      });

      return this.auth.emailPasswordLogin(email,password)

    }catch(error){

      console.log('Error on register user', error)
      return error
      
    }
  }
}