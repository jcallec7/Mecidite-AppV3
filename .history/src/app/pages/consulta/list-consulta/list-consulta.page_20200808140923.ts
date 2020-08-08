import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { Consulta } from 'src/app/model/Consulta';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { Usuario } from 'src/app/model/Usuario';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { DiagnosticoServiceService } from 'src/app/services/diagnostico-service/diagnostico-service.service';

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.page.html',
  styleUrls: ['./list-consulta.page.scss'],
})
export class ListConsultaPage implements OnInit {

  private consultas: Observable<Consulta[]>;
  private usuario: Usuario = new Usuario();
  private consultasVisibles: Consulta[];
  private diagnostico: Diagnostico = new Diagnostico();

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController,
              private callNumber: CallNumber,
              private localNotifications: LocalNotifications,
              private diagnosticoService: DiagnosticoServiceService) { }

  ngOnInit() {

    // cargar datos de la sesion:
    
    let auxInfo: any[] = []

    console.log("obteniendo datos paciente ");
    this.auth.getCurrentUser().then(async user => {
      console.log(user)
      if(user){
        let uid = user['uid']
        console.log("uid: " + uid)
        this.usuario = await this.consultaService.getUsuarioById(uid)
        console.log("usuario rol: " + this.usuario.rol)
        if(this.usuario.rol == '2') {

          this.consultas = this.consultaService.getConsultasByMedicoUID(uid)

          

          this.consultas.subscribe(data => {
            //let c: Consulta = data
            //console.log("consulta recuperada?: " + JSON.stringify(data))
            
            data.forEach(async data2 => {

              let u: Usuario = await this.consultaService.getUsuarioById(data2.pacienteUID)

              data2.pacienteUID = u.nombre + " " + u.apellido + ", " + u.cedula
              
            })

            this.consultasVisibles = data

            console.log("CONSULTAS ACTUALIZADAS: ", this.consultasVisibles)

          })

          

          
          
        } else if (this.usuario.rol == '3') {
          this.consultas = this.consultaService.getConsultasByPacienteUID(uid)

          this.consultas.subscribe(data => {

            data.forEach(async data2 => {
          
              let u: Usuario = await this.consultaService.getUsuarioById(data2.medicoUID)
              data2.medicoUID = u.nombre + " " + u.apellido + ", " + u.especialidad

              
            })

            this.consultasVisibles = data

            console.log("CONSULTAS ACTUALIZADAS: ", this.consultasVisibles)

          })

          

        }

        

      }else{
        console.log("Usuario no rescatado")
        this.router.navigate(['welcome'])
      }

    });

    

  }

  editConsulta(uid: string) {
    this.router.navigate([`edit-consulta/${uid}`]);
    /*NOTIFICACION */
    this.localNotifications.schedule({
    id: 5,
    title: 'Consulta Guardada',
    text: 'El pago esta confirmado',
    data: { mydata: 'GUARDADO'},
    trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
  });
  }

  async llamarmedico(uid: string) {
    const med: Usuario = await this.consultaService.getUsuarioById(uid);
    console.log(med.telf);
    this.callNumber.callNumber(med.telf, true);
    //med.telf //Aqui esta el telefono hazte loco
  }

  async showDiagnostico(diagnosticoUID: string)
  {
    this.diagnosticoService.getDiagnostico(diagnosticoUID).then(Data => {
      console.log(Data);
      
      this.diagnostico = Data;
      console.log(this.diagnostico);

    });
  }

  realizarPago(consulta: Consulta) {

    // cargar datos de la sesion:
    
    this.auth.getCurrentUser().then(user => {
      console.log(user);
      if(user){

        //console.log("Consulta Usuario uid: " + this.consulta.pacienteUID)
        let navigationExtras: NavigationExtras = {
          state: {
              consulta: consulta
          }
        };  
        this.router.navigate(["/factura"], navigationExtras);
      }else{
        console.log("Usuario no rescatado")
        this.router.navigate(['welcome'])
      }

    });

  }

  addDiagnostico(consulta: Consulta) {
    this.router.navigate([`create-diagnostico/${consulta.uid}`]);
  }

  goBack() {
    this.nav.back();
  }



}
