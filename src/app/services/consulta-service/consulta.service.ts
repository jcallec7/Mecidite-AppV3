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

  async getConsulta(uid: string): Promise<Consulta> {
    try{
      let aux:any = await this.afs.collection("consultas", 
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

  addConsulta(consulta: Consulta) {
    const refConsulta = this.afs.collection('consultas');
    consulta.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(consulta));
    refConsulta.doc(consulta.uid).set(param, {merge: true});
  }

  updateConsulta(consulta: Consulta): Promise<void> {
    return this.consultaCollection.doc(consulta.uid).update({ estado: consulta.estado });
  }

  updateConsulta2(consulta: Consulta) {
    console.log("AQUI DEBE ACTUALISARSE EL ESTADO DE: " + consulta.uid + " A: " + consulta.estado)
    const refUser =  this.afs.collection("consultas")
    const param = JSON.parse(JSON.stringify(consulta));
    console.log("params a actualizarse: " + JSON.stringify(param))
    refUser.doc(consulta.uid).update(param)
  }

  deleteConsulta(uid: string): Promise<void> {
    return this.consultaCollection.doc(uid).delete();
  }

}
