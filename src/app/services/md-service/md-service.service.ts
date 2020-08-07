import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Medicamento } from 'src/app/model/Medicamento';
import { first, map } from 'rxjs/operators';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';

@Injectable({
  providedIn: 'root'
})
export class MdServiceService {

  private meDetalles: Observable<MedicamentoDetalle[]>;
  private meDetalleCollection: AngularFirestoreCollection<MedicamentoDetalle>;


  constructor(private afs: AngularFirestore) { 
    this.meDetalleCollection = this.afs.collection<MedicamentoDetalle>('medicamento-detalle');
    this.meDetalles = this.meDetalleCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const uid = a.payload.doc.id;
            return { uid, ...data };
          });
        })
    ); 
  }

  getConsultasByMedicamentoUID(uid: string): Observable<any[]> {
    return this.afs.collection('medicamento-detalle',
      ref => ref.where('medicamentoUID', '==', uid))
      .valueChanges();
  }

  getMedicamentos(): Observable<any[]> {
    return this.afs.collection('medicamento')
      .valueChanges();
  }

  async getMedicamcentoById(uid: string): Promise<Medicamento> {
    try{
        let aux:any = await this.afs.collection("medicamento", 
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
  
  getMeDetalles(): Observable<MedicamentoDetalle[]> {
    return this.meDetalles;
  }


  addMedicamento(md: MedicamentoDetalle): Promise<DocumentReference> {
    md.uid = this.afs.createId();
    return this.meDetalleCollection.add(md);
  }
  /*
  updateNote(md: MedicamentoDetalle): Promise<void> {
    return this.meDetalleCollection.doc(md.uid).update({ estado: consulta.estado, fecha: consulta.fecha });
  }
  */
  deleteNote(uid: string): Promise<void> {
    return this.meDetalleCollection.doc(uid).delete();
  }

  
  
  /*
  getMedicamentos(): Observable<any[]> {
    return this.afs.collection('medicamento').valueChanges();
  }

  getMediDetalles() :Observable<any[]> {
    return this.afs.collection('medicamento-detalle').valueChanges();
  }


  async getMedicamentoById(uid: string): Promise<Medicamento> {
    try{
        let aux:any = await this.afs.collection("medicamento", 
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

  createMediDetalle(md: MedicamentoDetalle, medicamentoId: string) {
    
    const refConsulta = this.afs.collection('medicamento-detalle');
    md.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(md));
    refConsulta.doc(md.uid).set(param, {merge: true} );

    this.afs.collection("medicamento-detalle").doc(md.uid).update({
      medicamento: this.afs.collection("medicamento").doc(medicamentoId).ref});

  }

  deleteMedicamentoDetalle(docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.afs
            .collection('medicamento-detalle')
            .doc(docID)
            .delete()
            .then((obj: any) => {
                resolve(obj);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
  }
  */

}
