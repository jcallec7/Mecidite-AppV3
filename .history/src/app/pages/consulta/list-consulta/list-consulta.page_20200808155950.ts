import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { Consulta } from 'src/app/model/Consulta';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { Usuario } from 'src/app/model/Usuario';
import { NavController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { DiagnosticoServiceService } from 'src/app/services/diagnostico-service/diagnostico-service.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Medicamento } from '../../../model/Medicamento';
import { MedicamentoServiceService } from '../../../services/medicamento-service/medicamento-service.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.page.html',
  styleUrls: ['./list-consulta.page.scss'],
})
export class ListConsultaPage implements OnInit {

  private consultas: Observable<Consulta[]>;
  private usuario: Usuario = new Usuario();
  private consultasVisibles: Consulta[];
  private diagnostico: Diagnostico;
  pdfObj = null;
  private medicamento: string;
  private medicamentoNombres: Medicamento [];


  

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController,
              private callNumber: CallNumber,
              private localNotifications: LocalNotifications,
              private diagnosticoService: DiagnosticoServiceService,
              private file: File,
              private fileOpener: FileOpener,
              private plt: Platform,
              private medicamentoService: MedicamentoServiceService) { }

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
    
    this.diagnosticoService.getDiagnostico(diagnosticoUID).then(data => {

     

      data.medicamento.forEach( async data2=>{
        let m: Medicamento;
        
        m = await this.medicamentoService.getMedicamentoByUID(data2);
        console.log(m)
        data.medicamento = [m.concentracion+' ' +m.nombre+' '+m.uid];
      })
      this.diagnostico = data;
      console.log(this.diagnostico);

      const fecha = new Date().toISOString();

      var docDefinition = {
        content: [
          { text: 'MEDICITE S.A.', style: 'header' },
          { text: 'Cuenca-Ecuador', style: 'subheader' },
          { text: 'medicite@gmail.com', style: 'subheader' },
          { text: 'Telefono: 2828628', style: 'subheader' },
          { text: 'RUC: 0106432503', style: 'subheader' },
          { text: fecha  , alignment: 'right'},
  
          { text: 'Paciente', style: 'header' },
  
          { text: 'Nombres:', style: 'subheader' },
          { text: this.usuario.nombre },

          { text: 'Apellidos:', style: 'subheader' },
          { text: this.usuario.apellido },
  
          { text: 'Cedula:', style: 'subheader' },
          { text: this.usuario.cedula},

          { text: ''},

          { text: 'Diagnostico', style: 'header' },
          { text: 'Tipo:', style: 'subheader' },
          { text: data.tipo},
          { text: 'Descripcion:', style: 'subheader' },
          { text: data.descripcion},
          { text: 'Medicamentos:', style: 'subheader' },
          { text: this.diagnostico.medicamento},

        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      };
      
      this.pdfObj = pdfMake.createPdf(docDefinition);
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
  
          this.file.writeFile(this.file.dataDirectory, 'diagnostico.pdf', blob, { replace: true }).then(fileEntry => {
            this.fileOpener.open(this.file.dataDirectory + 'diagnostico.pdf', 'application/pdf');
          });
        });
      } else {
        this.pdfObj.download();
      }





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
