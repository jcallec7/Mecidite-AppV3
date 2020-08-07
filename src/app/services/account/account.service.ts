import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private afs: AngularFirestore) { }

  getUsuario(uid: string): Observable<any>{
    let itemDoc = this.afs.doc<any>(`usuarios/${uid}`);
    return itemDoc.valueChanges();
  }

}
