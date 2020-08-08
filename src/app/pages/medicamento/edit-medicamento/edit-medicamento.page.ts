import { Component, OnInit } from '@angular/core';
import { MedicamentoServiceService } from 'src/app/services/medicamento-service/medicamento-service.service';
import { Medicamento } from 'src/app/model/Medicamento';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-medicamento',
  templateUrl: './edit-medicamento.page.html',
  styleUrls: ['./edit-medicamento.page.scss'],
})
export class EditMedicamentoPage implements OnInit {

  constructor(
    private ms: MedicamentoServiceService,
    private alert: AlertController,
    private router: Router,
    private route: ActivatedRoute) { }

  medicamento = new Medicamento();
  
  showItem = false;

  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      this.medicamento= this.router.getCurrentNavigation().extras.state.medicamento;
    })
  }

  updateMedicamento() {
    const message = this.ms.updateMedicamento(this.medicamento);

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

        this.router.navigate(["list-medicamento"])
        console.log('Edicion exitosa')



      }


    })

  }

}
