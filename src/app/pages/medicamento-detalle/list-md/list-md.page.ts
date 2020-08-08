import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MdServiceService } from 'src/app/services/md-service/md-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-list-md',
  templateUrl: './list-md.page.html',
  styleUrls: ['./list-md.page.scss'],
})
export class ListMdPage implements OnInit {

  private mediDetalles: Observable<any[]>
  private md: MedicamentoDetalle = new MedicamentoDetalle;

  constructor(private mdService: MdServiceService,
    private route: ActivatedRoute,
    private nav: NavController,
    private router: Router ) { }
  
  ngOnInit() {
    this.mediDetalles = this.mdService.getMedicamentos();
    
     
  }

  trackByFn(index,obj){
    return obj.uid;
  }

  showCrearMD(){
    this.router.navigate([`medicamento-detalle`])
  }
/*
  deleteMedicamentoDetalle(medicamentoID: string) {
    this.mdService.deleteMedicamentoDetalle(medicamentoID);
  }
*/
  goBack() {
    this.nav.back();
  }


}
