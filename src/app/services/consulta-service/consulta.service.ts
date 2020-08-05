import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Consulta } from 'src/app/model/Consulta';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private afs: AngularFirestore) { }

  getMedicos(): Observable<any[]> {
    return this.afs.collection('usuarios',
      ref => ref.where('rol', '==', 
      this.afs.collection('roles').doc('medico').ref))
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

  createConsulta(consulta: Consulta, medicoUid: string, pacienteUid: string) {
    
    let auxConsulta = consulta;

    const refConsulta = this.afs.collection('consultas');
    
    auxConsulta.paciente = null;
    auxConsulta.medico = null;
    auxConsulta.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(auxConsulta));
    
    refConsulta.doc(auxConsulta.uid).set(param);

    this.afs.collection("consultas").doc(auxConsulta.uid).update({
      paciente: this.afs.collection("usuarios").doc(pacienteUid).ref,
      medico: this.afs.collection("usuarios").doc(medicoUid).ref});

  }

}
