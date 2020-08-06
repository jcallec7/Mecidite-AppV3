import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/Consulta';
import { FacturaService } from 'src/app/services/factura-service/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { Factura } from 'src/app/model/Factura';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { Usuario } from 'src/app/model/Usuario';
import { Rol } from 'src/app/model/Rol';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

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

  paciente: any = {

    id: "",
    data: {} as Usuario

  };

  constructor(private facturaService: FacturaService,
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

    (await this.usuarioService.getUsuario2(this.consulta.pacienteUID)).subscribe((res) => {
      if (res.payload.data() != null){
        this.paciente.id = res.payload.id;
        this.paciente.data = res.payload.data();
      } else {
        this.paciente.data = {} as Usuario;
      }
    });

    console.log("nombre " + this.paciente.nombre)

    this.factura.consultaUID = this.consulta.uid
    this.factura.subtotal = 30 / 1.12;
    this.factura.total = 30;

  }

  fillWithCurrentData() {

    

  }

    

}
