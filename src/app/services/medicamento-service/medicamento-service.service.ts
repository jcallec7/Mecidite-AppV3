import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Medicamento } from 'src/app/model/Medicamento';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoServiceService {

  itemDoc: AngularFirestoreDocument<Medicamento>;

  constructor(private afs: AngularFirestore) { }


  saveMedicamento(medicamento:Medicamento){
    const refMedicamento = this.afs.collection("medicamento");
    medicamento.uid = this.afs.createId()
    const param = JSON.parse(JSON.stringify(medicamento));
    refMedicamento.doc(medicamento.uid).set(param,{ merge:true});
  }


  getMedicamentos(): Observable<any[]>{
    return this.afs.collection('medicamento').valueChanges();
  }

  async updateMedicamento(medicamento: Medicamento){

    try{

      const refMedicamento =  this.afs.collection("medicamento")
      const param = JSON.parse(JSON.stringify(medicamento));
      refMedicamento.doc(medicamento.uid).set(param)

      return true

    }catch(error){

      return false

    }
    
  }


  deleteMedicamento(docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.afs
            .collection('medicamento')
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

  getMedicamentosPorNombre(): Observable<any[]>{
    return this.afs.collection('empleos', 
        ref => ref.where("nombre","==","Aspirina").
        orderBy('fecha', 'asc')).valueChanges();
  }

  getMedicamento(uid: string): Observable<any>{
    let itemDoc = this.afs.doc<any>(`medicamento/${uid}`);
    console.log(itemDoc);
    return itemDoc.valueChanges();
  }


  
  async getMedicamentoByUID(uid: string): Promise<Medicamento> {
    try {
      let aux: any = await this.afs.collection("medicamento",
        ref => ref.where('uid', '==', uid))
        .valueChanges().pipe(first()).toPromise().then(doc => {
          return doc;
        }).catch(error => {
          throw error;
        });
      if (aux.length == 0)
        return undefined;
      return aux[0];
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }


  
}
