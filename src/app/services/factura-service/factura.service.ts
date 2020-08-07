import { Injectable } from '@angular/core';
import { Factura } from 'src/app/model/Factura';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private facturas: Observable<Factura[]>;
  private facturaCollection: AngularFirestoreCollection<Factura>;

  constructor(private afs: AngularFirestore) {

    this.facturaCollection = this.afs.collection<Factura>('facturas');
    this.facturas = this.facturaCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );

  }

  getFacturas(): Observable<Factura[]> {
    return this.facturas;
  }

  getFactura(uid: string): Observable<Factura> {
    return this.facturaCollection.doc<Factura>(uid).valueChanges().pipe(
        take(1),
        map(factura => {
          factura.uid = uid;
          return factura;
        })
    );
  }

  addFactura(factura: Factura): Promise<DocumentReference> {
    return this.facturaCollection.add(factura);
  }

  /*updateFactura(factura: Factura): Promise<void> {
    return this.facturaCollection.doc(factura.uid).update({ title: factura.title, content: note.content });
  }*/

}
