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
  
    async createMediDetalle() {
      this.mdService.createMediDetalle(this.md, this.medicamentoSelected.uid);
      
      //console.log("Medicamento = " + this.md.medicamento.uid);
      //this.router.navigate(['lista-empleos'])
    }

    public saveFruit(md: MedicamentoDetalle){
      let key = this.afDB.list('/fruits/').push(md).key;
      //Guardamos la fruta y obetenemos el id que firebase pone al nudulo de nuestra fruta.
      //Al guardarse sin id nuestra fruta, ahora la actualizamos con el id que firebase nos devuelve.
      fruit.id = key;
      this.afDB.database.ref('fruits/'+fruit.id).set(fruit);
     
  }

    goBack() {
      this.nav.back();
    }
  
  
  
}
