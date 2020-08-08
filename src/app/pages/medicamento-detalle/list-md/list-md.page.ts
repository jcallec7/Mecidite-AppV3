import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MdServiceService } from 'src/app/services/md-service/md-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';
import { NavController } from '@ionic/angular';
import { Medicamento } from 'src/app/model/Medicamento';


@Component({
  selector: 'app-list-md',
  templateUrl: './list-md.page.html',
  styleUrls: ['./list-md.page.scss'],
})
export class ListMdPage implements OnInit {

  private mediDetalles: Observable<any[]>
  private medicamento: Medicamento = new Medicamento();

  constructor(private mdService: MdServiceService,
    private route: ActivatedRoute,
    private nav: NavController,
    private router: Router ) { }
  
  ngOnInit() {
    
    this.mediDetalles =  this.mdService.getMeDetalles();
    let uid= Medicamento['uid'];
    //this.mediDetalles =  this.mdService.getConsultasByMedicamentoUID(uid);


  }

  deleteMedicamento(medicamentoID: string) {
    this.mdService.deleteMedicamento(medicamentoID);
  }

  trackByFn(index,obj){
    return obj.uid;
  }

  showCrearMD(){
    this.router.navigate([`create-md`])
  }

  
  goBack() {
    this.nav.back();
  }


}
