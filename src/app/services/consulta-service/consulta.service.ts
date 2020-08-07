import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Consulta } from 'src/app/model/Consulta';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { first, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private consultas: Observable<Consulta[]>;
  private consultaCollection: AngularFirestoreCollection<Consulta>;

  constructor(private afs: AngularFirestore) { 
    this.consultaCollection = this.afs.collection<Consulta>('consultas');
    this.consultas = this.consultaCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const uid = a.payload.doc.id;
            return { uid, ...data };
          });
        })
    ); 
  }

  getConsultasByMedicoUID(uid: string): Observable<any[]> {
    return this.afs.collection('consultas',
      ref => ref.where('medicoUID', '==', uid))
      .valueChanges();
  }

  getConsultasByPacienteUID(uid: string): Observable<any[]> {
    return this.afs.collection('consultas',
      ref => ref.where('pacienteUID', '==', uid))
      .valueChanges();
  }

  getMedicos(): Observable<any[]> {
    return this.afs.collection('usuarios',
      ref => ref.where('rol', '==', '2'))
      .valueChanges();
  }

  async getUsuarioById(uid: string): Promise<Usuario> {
    try{
        let aux:any = await this.afs.collection("usuarios", 
            ref => ref.where('uid', '==', uid))
                      .valueChanges().pipe(first()).toPromise().then(doc => {                    	  
                          return doc;
                      }).catch(error => {
                          throw error;
                      });
        if(aux.length==0)
            return undefined;
        return aux[0];
    }catch(error){
      console.error("Error", error);
      throw error;
    } 
  }

  getConsulas(): Observable<Consulta[]> {
    return this.consultas;
  }

  getConsulta(uid: string): Observable<Consulta> {
    return this.consultaCollection.doc<Consulta>(uid).valueChanges().pipe(
        take(1),
        map(consulta => {
          consulta.uid = uid;
          return consulta;
        })
    );
  }

  addConsulta(consulta: Consulta): Promise<DocumentReference> {
    consulta.uid = this.afs.createId();
    return this.consultaCollection.add(consulta);
  }

  updateConsulta(consulta: Consulta, estado:string) {
    return this.afs.collection("consultas").doc(consulta.uid).update({
      estado: estado});
  }

  deleteConsulta(uid: string): Promise<void> {
    return this.consultaCollection.doc(uid).delete();
  }

}
