import { Component, OnInit } from '@angular/core';
import { MdServiceService } from 'src/app/services/md-service/md-service.service';
import { Observable } from 'rxjs';
import { Medicamento } from 'src/app/model/Medicamento';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-md',
  templateUrl: './create-md.page.html',
  styleUrls: ['./create-md.page.scss'],
})
export class CreateMdPage implements OnInit {

  md: MedicamentoDetalle = {
    uid: "",
    medicamentoUID: "",
    dosis: ""
  }

  medicamentos: Observable<Medicamento[]>;
  medicamentoSelected: MedicamentoDetalle;

  constructor(private mdService: MdServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private nav: NavController) { }

  ngOnInit() {
    console.log("Aqui se listan los medicamentos");
    this.medicamentos = this.mdService.getMedicamentos();
  }

  onChange() {
    console.log("Selected: " + this.medicamentoSelected + " uid: " + this.medicamentoSelected.uid);
  }

  async createMD() {
    console.log("obteniendo datos del medicamento ");
    
    this.md.medicamentoUID = this.medicamentoSelected.medicamentoUID;
    let navigationExtras: NavigationExtras = {
      state: {
        md: this.md
      }
    };
    console.log("hasta aqui" +this.md);
    this.mdService.addMedicamento(this.md);
    this.router.navigate(["/list-md"], navigationExtras);
    
  }


  

}
