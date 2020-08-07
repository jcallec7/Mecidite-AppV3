import { Component, OnInit } from '@angular/core';
import { Medicamento } from 'src/app/model/Medicamento';
import {MedicamentoServiceService} from 'src/app/services/medicamento-service/medicamento-service.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-create-medicamento',
  templateUrl: './create-medicamento.page.html',
  styleUrls: ['./create-medicamento.page.scss'],
})
export class CreateMedicamentoPage implements OnInit {

  medicamento: Medicamento = new Medicamento();

  constructor(private ms: MedicamentoServiceService,
    private nav: NavController) { }

  ngOnInit() {
  }

  async guardarMedicamento(){
    console.log(this.medicamento);
    this.ms.saveMedicamento(this.medicamento);
    
    //let number = await this.ms.    .saveEmpleado2(this.empleo);
    //console.log("Nuevo Registro de medicamento almacenado", number);
    //this.empleoService.saveEmpleo(this.empleo);
  }

  goBack() {
    this.nav.back();
  }


}
