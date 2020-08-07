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

  addConsulta(diagnostico: Diagnostico): Promise<DocumentReference> {
    diagnostico.uid = this.afs.createId();
    return this.diagnosticoCollection.add(diagnostico);
  }

  deleteNote(uid: string): Promise<void> {
    return this.diagnosticoCollection.doc(uid).delete();
  }

}
