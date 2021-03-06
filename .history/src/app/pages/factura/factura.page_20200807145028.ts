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
  createPdf(datos: any) {
    console.log(datos);
    var docDefinition = {
      content: [
        { text: 'MEDICITE S.A.', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'Titulo Empleos:', style: 'subheader' },
        { text: datos.nombre },

        { text: 'Descripcion y Salario:', style: 'subheader' }, datos.total ,

        { text: datos.salario , style: 'story', margin: [0, 20, 0, 20] },

        {
          ul: [
            'Cosas Extra:',
            'Cosas Extra:',
            'Cosas Extra:',
          ]
        }
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

  downloadPdf() {
  }

}
