import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/model/Consulta';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { Usuario } from 'src/app/model/Usuario';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.page.html',
  styleUrls: ['./list-consulta.page.scss'],
})
export class ListConsultaPage implements OnInit {

  private consultas: Observable<Consulta[]>;
  private usuarios: Observable<Usuario[]>; // Lista de usaurios medicos o pacientes dependiendo el rol consultante
  private usuario: Usuario = new Usuario();

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController) { }

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
        } else if (this.usuario.rol == '3') {
          this.consultas = this.consultaService.getConsultasByPacienteUID(uid)

          this.consultas.subscribe(data => {
            //let c: Consulta = data
            //console.log("consulta recuperada?: " + JSON.stringify(data))
            data.forEach(data2 => {
              let c: Consulta = data2
              console.log("consulta recuperada?: " + c.medicoUID)
            })
          })


        }

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
