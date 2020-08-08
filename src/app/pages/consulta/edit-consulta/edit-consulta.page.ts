import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta-service/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { NavController } from '@ionic/angular';
import { Consulta } from 'src/app/model/Consulta';

@Component({
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.page.html',
  styleUrls: ['./edit-consulta.page.scss'],
})
export class EditConsultaPage implements OnInit {

  private consulta: Consulta = new Consulta();

  constructor(private consultaService: ConsultaService, 
              private route: ActivatedRoute, 
              public router: Router, 
              public auth: AuthenticationService,
              private nav: NavController) { }

  ngOnInit() {
  }

}
