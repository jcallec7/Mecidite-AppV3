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

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  estado: string

  consulta: Consulta  = {

    uid: "",
    pacienteUID: "",
    medicoUID: "",
    estado: this.estado,
    fecha: "",
    diagnosticoUID: ""

  }
  
  

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
              public auth: AuthenticationService) { }

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

  saveFactura() {
    this.facturaService.addFactura(this.factura)
    this.estado = "Pagada, pendiente de atencion"
    this.consulta.estado = this.estado
    console.log("consulta uid: " + this.consulta.uid)
    console.log("consulta estado: " + this.consulta.estado)


    this.consultaService.updateConsulta(this.consulta, this.estado)
    
    this.router.navigate(['list-consulta']);

  }

}
