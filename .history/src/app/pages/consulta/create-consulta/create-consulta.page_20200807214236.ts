import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/Consulta';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-consulta',
  templateUrl: './create-consulta.page.html',
  styleUrls: ['./create-consulta.page.scss'],
})
export class CreateConsultaPage implements OnInit {

  consulta: Consulta  = {

    uid: "",
    pacienteUID: "",
    medicoUID: "",
    estado: "",
    fecha: new Date().toISOString(),
    diagnosticoUID: ""

  }

  fechamax: string;
  medicos: Observable<Usuario[]>;
  medicoSelected: Usuario;

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController) { }

  ngOnInit() {

    this.medicos = this.consultaService.getMedicos();

		//console.log("consulta inicializada: " + JSON.stringify(this.consulta))
    
    const d = new Date();
    d.setDate(d.getDate() + 60);
    this.fechamax = d.toISOString(); 

  }

  onChange() {
    console.log("Selected: " + this.medicoSelected + " uid: " + this.medicoSelected.uid);
  }

  async createConsulta() {

    // cargar datos de la sesion:
    
    console.log("obteniendo datos paciente ");
    this.auth.getCurrentUser().then(user => {
      console.log(user)
      if(user){
        this.consulta.medicoUID = this.medicoSelected.uid;
        this.consulta.pacienteUID = user['uid']
        this.consulta.estado = "Creada, pendiente de pago";
        //console.log("Consulta Usuario uid: " + this.consulta.pacienteUID)
        let navigationExtras: NavigationExtras = {
          state: {
              consulta: this.consulta
          }
        };
        this.consultaService.addConsulta(this.consulta);   
        this.router.navigate(["/factura"], navigationExtras);
      }else{
        console.log("Usuario no rescatado")
        this.router.navigate(['welcome'])
      }

    });

    
    

    //console.log("sending consult (Paciente UID): " + this.consulta.pacienteUID) ;

    
  }

  goBack() {
    this.nav.back();
  }



}
