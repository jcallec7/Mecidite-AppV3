import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {DiagnosticoServiceService} from 'src/app/services/diagnostico-service/diagnostico-service.service'
import { Observable } from 'rxjs';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';

@Component({
  selector: 'app-list-diagnostico',
  templateUrl: './list-diagnostico.page.html',
  styleUrls: ['./list-diagnostico.page.scss'],
})
export class ListDiagnosticoPage implements OnInit {

  private diagnosticos: Observable<Diagnostico[]>
  private diagnosticosVisibles: Diagnostico[];

  constructor(
    private dService: DiagnosticoServiceService,
    private route: ActivatedRoute,
    private nav: NavController,
    private router: Router 
  ) { }

  ngOnInit() {
    this.diagnosticos = this.dService.getDiagnosticos();
    this.diagnosticos = this.dService.getDiagnosticos();
    this.diagnosticos.subscribe(data=>{
      data.forEach(async data2 =>{
        //let d: MedicamentoDetalle = await this.dService.getDetalleById(data2.prescripcionUID);
        //data2.prescripcionUID = d.nombre;
      })
      this.diagnosticosVisibles = data
      console.log("DIAGNOSTICOS ACTUALIZADAS: ", this.diagnosticosVisibles)

    })

  }

  showCrearMD(){
    this.router.navigate([`create-diagnostico`])
  }

  goBack() {
    this.nav.back();
  }


}
