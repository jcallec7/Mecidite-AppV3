import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/Consulta';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { AuthenticationService } from 'src/app/services/login/authentication.service';

@Component({
  selector: 'app-create-consulta',
  templateUrl: './create-consulta.page.html',
  styleUrls: ['./create-consulta.page.scss'],
})
export class CreateConsultaPage implements OnInit {

  consulta: Consulta

  fechamin: string;
  fechamax: string;
  horas: string[];

  paciente: Usuario;

  medicos: Observable<Usuario[]>;
  medicoSelected: Usuario;

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService) { }

  ngOnInit() {

    this.medicos = this.consultaService.getMedicos();
    this.auth.getCurrentUser().then(user=>{
      console.log(user)
    });

    this.consulta = {

      uid: "",
      paciente: null,
      medico: null,
      estado: "",
      fecha: new Date().toISOString(),
      diagnostico: null
  
    }

		console.log("consulta inicializada: " + JSON.stringify(this.consulta))
    
    const d = new Date();
    d.setDate(d.getDate() + 60);
    this.fechamin = d.toISOString();
    this.fechamax = d.toISOString(); 
    
    /*
    this.consulta.fecha = ;
    this.consulta.fecha = moment(this.consulta.fecha).toISOString();
    this.fechamin = moment().subtract(5, 'h').format();
    this.fechamin = moment(this.fechamin).toISOString();*/

    //console.log(this.fechamin + "fecha consulta: " + this.consulta.fecha);
    
    //this.fechamax = moment().add(60, 'd').format();
    //this.fechamax = moment(this.fechamax).toISOString();

    //console.log(this.fechamin + "fecha consulta: " + this.consulta.fecha);


  }

  onChange() {
    console.log("Selected: " + this.medicoSelected + " uid: " + this.medicoSelected.uid);
  }

  async createConsulta() {

    this.consulta.medico = this.medicoSelected;

    // cargar datos de la sesion:
    console.log("obteniendo datos paciente ");
    this.consulta.paciente = await this.consultaService.getUsuarioById('Blvbt2LTeCNkv3NtqfAaOVRw4ff1');
    console.log("Paciente: " + this.consulta.paciente.nombre);
    console.log("Medico: " + this.medicoSelected.uid);

    //
    this.consulta.estado = "Creada, pendiente de pago";

    console.log("sending consult: " + JSON.stringify(this.consulta) ) ;

    /*let navigationExtras: NavigationExtras = {
      queryParams: {
          'consulta': this.consulta
      }
    };*/
    //this.consultaService.createConsulta(this.consulta, this.medicoSelected.uid, this.consulta.paciente.uid);

    this.router.navigate([`factura/${this.consulta}`]);

  }

}
