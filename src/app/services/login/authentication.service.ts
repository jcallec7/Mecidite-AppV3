import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, first } from "rxjs/operators";
import * as firebase from "firebase/app";
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  flag = false

  public user: Observable<any>;
  
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private platform: Platform) { 

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async getCurrentUser(): Promise<any> {
    return this.user.pipe(first()).toPromise();
  }

  
  async resetPassword(email: string){

      await this.afAuth.sendPasswordResetEmail(email).then(function(){
        console.log('Succesful')
        this.flag = true
        
      }).catch(function(error){
        console.log('ERROR', error)
        
      })      

      return this.flag
 
  } 

  async logout(): Promise<any> {
    return this.afAuth.signOut();
  } 

  /***************************************   EMAIL LOGIN *********************************/

  async emailPasswordLogin(email: string, password: string) {
    
    try {
      const emailCredential = firebase.auth.EmailAuthProvider.credential(email, password);
      const firebaseUser = await firebase.auth().signInWithCredential(emailCredential);
      return await this.updateUserData(firebaseUser.user, "email")
    } catch (err) {
      console.log('ERROR LOGIN:', err)
      return false;
    } 
  } 


  //-------------------------------------

  userExists(email: string) {
    console.log("userExists",email);
    return this.afs
      .collection("users", ref => ref.where("email", "==", email))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }

  // Guardar datos del usuario en Firestore
  async updateUserData(usertemp: any, provider: any) {
    console.log("update", JSON.stringify(usertemp));
    const doc: any = await this.userExists(usertemp.email);
    let data: any;
    let user: any = JSON.parse(JSON.stringify(usertemp));

    console.log("doc", JSON.stringify(doc));
    if (doc == null || doc == "") {
      //Crear cuenta
      data = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || '',
        photoURL: user.photoURL || "https://goo.gl/7kz9qG",
        provider: provider,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
        createdAt: new Date(Number(user.createdAt)) || new Date()
      };
    } else if (doc.active == false) {
      throw { error_code: 999, error_message: "Acceso denegado, servicio deshabilitado, consulte con el administrador." };
    } else {
      //Actualizar cuenta
      data = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || '',
        photoURL: user.photoURL || "https://goo.gl/7kz9qG",
        provider: provider,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date()
      };
    }

    console.log("data", JSON.stringify(data))
    const userRef = this.afs.collection<any>('usuarios');

    return userRef.doc(`${user.uid}`).set(data, { merge: true });
  } 

}

