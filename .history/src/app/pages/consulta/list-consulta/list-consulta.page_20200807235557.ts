import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.page.html',
  styleUrls: ['./list-consulta.page.scss'],
})
export class ListConsultaPage implements OnInit {

  private consultas: Observable<Consulta[]>;
  private usuario: Usuario = new Usuario();
  private c: Consulta = new Consulta();

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController,
              private callNumber: CallNumber,
              private localNotifications: LocalNotifications) { }

  ngOnInit() {

    // cargar datos de la sesion:
    
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
            let cont = 0
            data.forEach(async data2 => {
              this.c = data2
              let u: Usuario = await this.consultaService.getUsuarioById(this.c.pacienteUID)
              this.c.pacienteUID = u.nombre + " " + u.apellido + ", " + u.cedula
              
            })

          })
          
        } else if (this.usuario.rol == '3') {
          this.consultas = this.consultaService.getConsultasByPacienteUID(uid)

          this.consultas.subscribe(data => {
            //let c: Consulta = data
            //console.log("consulta recuperada?: " + JSON.stringify(data))
            let cont = 0
            data.forEach(async data2 => {
              this.c = data2
              let u: Usuario = await this.consultaService.getUsuarioById(this.c.medicoUID)
              this.c.medicoUID = u.nombre + " " + u.apellido + ", " + u.especialidad
              
            })

          })

          

        }

        

      }else{
        console.log("Usuario no rescatado")
        this.router.navigate(['welcome'])
      }

    });

  }

  editConsulta(uid: string) {
    this.router.navigate([`editar-empleo/${uid}`]);
    /*NOTIFICACION */
  this.localNotifications.schedule({
    id: 3,
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

  async showDiagnostico()
  {}

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

  goBack() {
    this.nav.back();
  }



}
