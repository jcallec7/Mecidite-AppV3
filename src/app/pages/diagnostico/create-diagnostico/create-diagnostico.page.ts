import { Component, OnInit } from '@angular/core';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Consulta } from 'src/app/model/Consulta';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';
import { Observable } from 'rxjs';
import {DiagnosticoServiceService} from 'src/app/services/diagnostico-service/diagnostico-service.service'
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
//import { Diagnostico } from 'src/app/model/Consulta';

@Component({
  selector: 'app-create-diagnostico',
  templateUrl: './create-diagnostico.page.html',
  styleUrls: ['./create-diagnostico.page.scss'],
})
export class CreateDiagnosticoPage implements OnInit {

  diagnostico: Diagnostico = new Diagnostico();
  prescripciones: Observable<MedicamentoDetalle[]>;
  //prescripcionSelected: MedicamentoDetalle;
  prescripcionSelected: [];
  consulta: Consulta = new Consulta();

  
  constructor( 
    private diagnosticoService:DiagnosticoServiceService, 
    private route: ActivatedRoute, 
    public router: Router, 
    private nav: NavController,
    private consultaService: ConsultaService) { }

  async ngOnInit() {
    this.prescripciones = this.diagnosticoService.getPrescripciones();

    const uid = this.route.snapshot.paramMap.get('uid');
    this.consulta = await this.consultaService.getConsulta(uid);
  }

  onChange() {
    console.log("Selected: " + this.prescripcionSelected);
  }

  async createDiagnostico(){
    this.diagnosticoService.createDiagnostico(this.diagnostico, this.prescripcionSelected);
    //this.diagnosticoService.addDiagnostico(this.diagnostico);
    let navigationExtras: NavigationExtras = {
      state: {
        md: this.diagnostico
      }
    };

    //console.log("Este es el uid rescatado del createDiagnostico: " + this.diagnostico.uid)
    
    this.consulta.diagnosticoUID = this.diagnostico.uid;
    this.consulta.estado = "Finalizada"

    this.consultaService.updateConsulta2(this.consulta)

    this.router.navigate(["/list-diagnostico"], navigationExtras);

  };

  goBack() {
    this.nav.back();
  }


  
  



}
