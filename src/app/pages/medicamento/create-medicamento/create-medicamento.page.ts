import { Component, OnInit } from '@angular/core';
import { Medicamento } from 'src/app/model/Medicamento';
import {MedicamentoServiceService} from 'src/app/services/medicamento-service/medicamento-service.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-medicamento',
  templateUrl: './create-medicamento.page.html',
  styleUrls: ['./create-medicamento.page.scss'],
})
export class CreateMedicamentoPage implements OnInit {

  medicamento: Medicamento = new Medicamento();

  constructor(private ms: MedicamentoServiceService,
    private nav: NavController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async guardarMedicamento(){
    console.log(this.medicamento);
    this.ms.saveMedicamento(this.medicamento);
    this.router.navigate(["list-medicamento"])

    //let number = await this.ms.    .saveEmpleado2(this.empleo);
    //console.log("Nuevo Registro de medicamento almacenado", number);
    //this.empleoService.saveEmpleo(this.empleo);
  }

  goBack() {
    this.nav.back();
  }

  goToEditMedicamento(){

    this.router.navigate(['edit-medicamento'])

  }


}
