import { Component, OnInit } from '@angular/core';
import { Medicamento } from 'src/app/model/Medicamento';
import {MedicamentoServiceService} from 'src/app/services/medicamento-service/medicamento-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-medicamento',
  templateUrl: './list-medicamento.page.html',
  styleUrls: ['./list-medicamento.page.scss'],
})
export class ListMedicamentoPage implements OnInit {

  constructor(
    private ms: MedicamentoServiceService,
    public router: Router,
    private nav: NavController
  ) { }

  medicamento:  Observable<any[]>
  medicamentos: Observable<any[]>
  medicamentos2: any[];
  


  ngOnInit() {
    this.medicamentos = this.ms.getMedicamentos();
  }

  goBack() {
    this.nav.back();
  }

  
   trackByFn(index,obj){
    return obj.uid;
  }

  showCrearMedicamento(){
    this.router.navigate([`create-medicamento`])
  }

  showEditMedicamento(medicamentoID: string){
    this.medicamento = this.ms.getMedicamento(medicamentoID);
    this.medicamento.subscribe(data=>{
      let extras: NavigationExtras = {
        state:{
          medicamento:data
        }
      }
      this.router.navigate([`edit-medicamento`], extras)
    })
    
    
  }
  

  deleteMedicamento(medicamentoID: string) {
    this.ms.deleteMedicamento(medicamentoID);
  }

}
