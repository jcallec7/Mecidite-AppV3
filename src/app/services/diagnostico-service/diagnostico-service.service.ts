import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { first, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoServiceService {

  private diagnosticos: Observable<Diagnostico[]>;
  private diagnosticoCollection: AngularFirestoreCollection<Diagnostico>;

  constructor(private afs: AngularFirestore) {
    this.diagnosticoCollection = this.afs.collection<Diagnostico>('diagnostico');
    this.diagnosticos = this.diagnosticoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }

  getDiagnosticosByPrescripcionUID(uid: string): Observable<any[]> {
    return this.afs.collection('diagnostico',
      ref => ref.where('prescripcionUID', '==', uid))
      .valueChanges();
  }

  getPrescripcion(): Observable<any[]> {
    return this.afs.collection('medicamento-detalle')
      .valueChanges();
  }


  //getDiagnostico(uid:string): Observable<Diagnostico>{}

  createDiagnostico(diagnostico: Diagnostico, prescripcionId: []) {
    
    const refConsulta = this.afs.collection('diagnostico');
    diagnostico.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(diagnostico));
    refConsulta.doc(diagnostico.uid).set(param, {merge: true} );

    this.afs.collection("diagnostico").doc(diagnostico.uid).update({
      medicamento: prescripcionId
    });

  }
  

  deleteNote(uid: string): Promise<void> {
    return this.diagnosticoCollection.doc(uid).delete();
  }

}
