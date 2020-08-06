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

  consulta: Consulta  = {

    uid: "",
    paciente: null,
    medico: null,
    estado: "",
    fecha: new Date().toISOString(),
    diagnostico: null

  }

  fechamax: string;
  paciente: Observable<any>;
  medicos: Observable<Usuario[]>;
  medicoSelected: Usuario;

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService) { }

  ngOnInit() {

    this.medicos = this.consultaService.getMedicos();

		console.log("consulta inicializada: " + JSON.stringify(this.consulta))
    
    const d = new Date();
    d.setDate(d.getDate() + 60);
    this.fechamax = d.toISOString(); 

  }

  onChange() {
    console.log("Selected: " + this.medicoSelected + " uid: " + this.medicoSelected.uid);
  }

  async createConsulta() {

    this.consulta.medico = this.medicoSelected;

    // cargar datos de la sesion:
    
    console.log("obteniendo datos paciente ");
    this.auth.getCurrentUser().then(user => {
      console.log(user)
      if(user){
        console.log("Usuario rescatado la pucta madre!!")
        this.paciente = user
      }else{
        console.log("Usuario no rescatado")
        //this.router.navigate(['welcome'])
      }

    }
    );
    console.log("User recuperado: " + this.paciente);
    //this.consulta.paciente = await this.paciente;
    console.log("Paciente: " + this.consulta.paciente.nombre);
    console.log("Medico: " + this.medicoSelected.uid);

    //
    this.consulta.estado = "Creada, pendiente de pago";

    console.log("sending consult: " + this.consulta ) ;

    /*let navigationExtras: NavigationExtras = {
      queryParams: {
          'consulta': this.consulta
      }
    };*/
    //this.consultaService.createConsulta(this.consulta, this.medicoSelected.uid, this.consulta.paciente.uid);

    //this.router.navigate([`factura/${this.consulta}`]);

  }

}
