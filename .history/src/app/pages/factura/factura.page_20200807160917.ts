import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/Consulta';
import { FacturaService } from 'src/app/services/factura-service/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { Factura } from 'src/app/model/Factura';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { Usuario } from 'src/app/model/Usuario';
import { Rol } from 'src/app/model/Rol';
import { database } from 'firebase';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  pdfObj = null;
  consulta: Consulta;
  
  factura: Factura = {

    uid: "",
    nombre: "",
    cedula_ruc: "",
    telefono: "",
    fecha: "",
    direccion: "",
    consultaUID: "",
    subtotal: 0,
    total: 0

  };

  rol: Rol = {
    uid: "3",
    descripcion: "paciente"
  };

  paciente: Usuario = new Usuario();

  medico: Usuario = new Usuario();


  constructor(private facturaService: FacturaService,
              private consultaService: ConsultaService,
              private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              public router: Router,
              public auth: AuthenticationService,
              private file: File,
              private fileOpener: FileOpener,
              private plt: Platform) { }

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.consulta = this.router.getCurrentNavigation().extras.state.consulta;
      }
    });

    this.paciente = await this.consultaService.getUsuarioById(this.consulta.pacienteUID)
    this.medico = await this.consultaService.getUsuarioById(this.consulta.medicoUID)

    console.log("nombre: " + this.medico.nombre)

    this.factura.consultaUID = this.consulta.uid
    this.factura.subtotal = 30 / 1.12;
    this.factura.total = 30;



  }

  fillWithCurrentData() {

    this.factura.nombre = this.paciente.nombre + " " + this.paciente.apellido
    this.factura.cedula_ruc = this.paciente.cedula
    this.factura.direccion = this.paciente.direccion
    this.factura.telefono = this.paciente.telf

  }

  /* CREACION PDF*/
  createPdf(datos: any, datos3: any) {
    console.log(datos);
    const fecha = new Date().getDay;
    var docDefinition = {
      content: [
        { text: 'MEDICITE S.A.', style: 'header' },
        { text: 'Cuenca-Ecuador', style: 'subheader' },
        { text: 'medicite@gmail.com', style: 'subheader' },
        { text: 'Telefono: 2828628', style: 'subheader' },
        { text: 'RUC: 0106432503', style: 'subheader' },


        { text: fecha  , alignment: 'right'},

        { text: 'Datos Cliente', style: 'header' },

        { text: 'Nombre y Apellidos:', style: 'subheader' },
        { text: datos.nombre },

        { text: 'Cedula:', style: 'subheader' },
        { text: datos.cedula_ruc},

        { text: 'Telefono:', style: 'subheader' },
        { text: datos.telefono },

        { text: 'Direccion:', style: 'subheader' },
        { text: datos.direccion},
        { text: ''},
        { text: 'Detalles', style: 'header' },
        { text: 'Consulta Medica'},
        { text: datos3.nombre },
        { text: datos3.apellido},
        { text: datos3.especialidad},
        { text: datos.subtotal , alignment: 'right'},

        { text: 'Subtotal', style: 'header' },
        { text:  datos.subtotal , alignment: 'right'},

        { text: 'TOTAL', style: 'header' },
        { text:  datos.total , alignment: 'right'}
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

        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        });
      });
    } else {
      this.pdfObj.download();
    }
  }
  /* FIN CREACION PDF*/

}
