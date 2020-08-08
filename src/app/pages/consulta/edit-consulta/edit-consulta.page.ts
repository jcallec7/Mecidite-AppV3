import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { NavController } from '@ionic/angular';
import { Consulta } from 'src/app/model/Consulta';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.page.html',
  styleUrls: ['./edit-consulta.page.scss'],
})
export class EditConsultaPage implements OnInit {

  private consulta: Consulta = new Consulta();
  private paciente: Usuario = new Usuario();
  private medico: Usuario = new Usuario();

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController) { }

  async ngOnInit() {

    const uid = this.route.snapshot.paramMap.get('uid');
    this.consulta = await this.consultaService.getConsulta(uid);

    this.medico = await this.consultaService.getUsuarioById(this.consulta.medicoUID);
    this.paciente = await this.consultaService.getUsuarioById(this.consulta.pacienteUID);

  }

  cancelarConsulta() {
    this.consulta.estado = "Cancelada"
  }

  guardarCambios() {
    this.consultaService.updateConsulta2(this.consulta)
  }


}
