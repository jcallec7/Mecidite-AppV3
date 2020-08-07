import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MdServiceService } from 'src/app/services/md-service/md-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';

type NewType = Router;

@Component({
  selector: 'app-list-md',
  templateUrl: './list-md.page.html',
  styleUrls: ['./list-md.page.scss'],
})
export class ListMdPage implements OnInit {

  mediDetalles: Observable<any[]>
  md: MedicamentoDetalle;

  constructor(
    private mdService: MdServiceService,
    private route: ActivatedRoute,
    public router: NewType 
  ) { }
  ngOnInit() {
    this.mediDetalles = this.mdService.getMediDetalles();
    
  }

  trackByFn(index,obj){
    return obj.uid;
  }

  showCrearMD(){
    this.router.navigate([`medicamento-detalle`])
  }

  deleteMedicamentoDetalle(medicamentoID: string) {
    this.mdService.deleteMedicamentoDetalle(medicamentoID);
  }



}
