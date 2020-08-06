import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Factura } from 'src/app/model/Factura';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Observable<Usuario[]>;
  private usuarioCollection: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore) { 

    this.usuarioCollection = this.afs.collection<Usuario>('usuarios');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );

  }

  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios;
  }

  getUsaurio(uid: string): Observable<Usuario> {
    return this.usuarioCollection.doc<Usuario>(uid).valueChanges().pipe(
        take(1),
        map(usuario => {
          usuario.uid = uid;
          return usuario;
        })
    );
  }

  async getUsuario2(uid: string){
    return this.afs.collection('usuarios').doc(uid).snapshotChanges();
  }

  addFactura(usuario: Usuario): Promise<DocumentReference> {
    return this.usuarioCollection.add(usuario);
  }

  updateFactura(usuario: Usuario): Promise<void> {
    return this.usuarioCollection.doc(usuario.uid).update({ /*title: factura.title, content: note.content */ });
  }

}
