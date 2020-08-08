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

  private mediDetalles: Observable<MedicamentoDetalle[]>
  private mediDetallesVisibles: MedicamentoDetalle[];

  constructor(private mdService: MdServiceService,
    private route: ActivatedRoute,
    private nav: NavController,
    private router: Router ) { }
  
  ngOnInit() {
    this.mediDetalles = this.mdService.getMedicamentos();
    
    this.mediDetalles =  this.mdService.getMeDetalles();

    this.mediDetalles.subscribe(data=>{

      data.forEach(async data2 => {

        let m: Medicamento = await this.mdService.getMedicamcentoById(data2.medicamentoUID);

        data2.medicamentoUID = m.nombre

      })

      this.mediDetallesVisibles = data

      console.log("MEDIDETALLE ACTUALIZADAS: ", this.mediDetallesVisibles)

    })
   
    

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
/*
  deleteMedicamentoDetalle(medicamentoID: string) {
    this.mdService.deleteMedicamentoDetalle(medicamentoID);
  }
*/
  goBack() {
    this.nav.back();
  }


}
