import { Component, OnInit } from '@angular/core';
import { MdServiceService } from 'src/app/services/md-service/md-service.service';
import { Observable } from 'rxjs';
import { Medicamento } from 'src/app/model/Medicamento';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-md',
  templateUrl: './create-md.page.html',
  styleUrls: ['./create-md.page.scss'],
})
export class CreateMdPage implements OnInit {

  md: MedicamentoDetalle = new MedicamentoDetalle();
  
  medicamentos: Observable<Medicamento[]>;
  medicamentoSelected: Medicamento;
  
  constructor(
    private mdService: MdServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private nav: NavController) { }

    ngOnInit() {
      this.medicamentos = this.mdService.getMedicamentos();
    }
  
    onChange() {
      console.log("Selected: " + this.medicamentoSelected + " uid: " + this.medicamentoSelected.uid);
    }
  
    
    

    goBack() {
      this.nav.back();
    }
  
  
  
}
