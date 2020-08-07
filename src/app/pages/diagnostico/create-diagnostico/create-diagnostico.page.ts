import { Component, OnInit } from '@angular/core';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Consulta } from 'src/app/model/Consulta';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';
import { Observable } from 'rxjs';
import {DiagnosticoServiceService} from 'src/app/services/diagnostico-service/diagnostico-service.service'
//import { Diagnostico } from 'src/app/model/Consulta';

@Component({
  selector: 'app-create-diagnostico',
  templateUrl: './create-diagnostico.page.html',
  styleUrls: ['./create-diagnostico.page.scss'],
})
export class CreateDiagnosticoPage implements OnInit {

  diagnostico: Diagnostico = new Diagnostico();
  prescripciones: Observable<MedicamentoDetalle[]>;
  prescripcionSelected: MedicamentoDetalle;
  
  constructor( 
    private diagnosticoService:DiagnosticoServiceService, 
    private route: ActivatedRoute, 
    public router: Router, 
    private nav: NavController) { }

  ngOnInit() {
    this.prescripciones = this.diagnosticoService.getPrescripcion();
  }

  onChange() {
    console.log("Selected: " + this.prescripcionSelected + " uid: " + this.prescripcionSelected.uid);
  }

  async createDiagnostico(){
   this.diagnosticoService.createDiagnostico(this.diagnostico, this.prescripcionSelected.uid);
    //this.diagnosticoService.addDiagnostico(this.diagnostico);
    
  };

  
  



}
