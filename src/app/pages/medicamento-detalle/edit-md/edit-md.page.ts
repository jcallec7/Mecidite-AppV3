import { Component, OnInit } from '@angular/core';
import { MdServiceService } from 'src/app/services/md-service/md-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { MedicamentoDetalle } from 'src/app/model/MedicamentoDetalle';

@Component({
  selector: 'app-edit-md',
  templateUrl: './edit-md.page.html',
  styleUrls: ['./edit-md.page.scss'],
})
export class EditMdPage implements OnInit {

  constructor(
    private mdService: MdServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private nav: NavController,
    private alert: AlertController,
  ) { }

  md = new MedicamentoDetalle();
  showItem = false;

  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      this.md= this.router.getCurrentNavigation().extras.state.md;
      console.log(this.md);
    })
  }

  updateMedicamento() {
    const message = this.mdService.updateDetalle(this.md);

    message.then(async msg => {

      if (msg == false) {

        const alert = await this.alert.create({
          header: 'Lo sentimos!',
          message: 'Algo sucedio, no se pudo actualizar sus datos, contactese con los proveedores.',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });

        await alert.present()

      } else {

        const alert = await this.alert.create({
          header: 'Listo!',
          message: 'Actualización completa.',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });

        await alert.present()

        this.router.navigate(["list-md"])
        console.log('Edicion exitosa')



      }


    })

  }

}
