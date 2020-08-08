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

<<<<<<< HEAD
  private mediDetalles: Observable<any[]>
  private md: MedicamentoDetalle = new MedicamentoDetalle;
=======
  private mediDetalles: Observable<MedicamentoDetalle[]>
  private mediDetallesVisibles: MedicamentoDetalle[];
>>>>>>> 96261efc9c96e6390f326e781ec039e9dc5b16d6

  constructor(private mdService: MdServiceService,
    private route: ActivatedRoute,
    private nav: NavController,
    private router: Router ) { }
  
  ngOnInit() {
    this.mediDetalles = this.mdService.getMedicamentos();
    
<<<<<<< HEAD
     
=======
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
>>>>>>> 96261efc9c96e6390f326e781ec039e9dc5b16d6
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
