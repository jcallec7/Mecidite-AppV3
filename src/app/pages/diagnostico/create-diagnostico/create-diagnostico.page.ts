import { Component, OnInit } from '@angular/core';
import { Diagnostico } from 'src/app/model/Diagnostico';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
//import { Diagnostico } from 'src/app/model/Consulta';

@Component({
  selector: 'app-create-diagnostico',
  templateUrl: './create-diagnostico.page.html',
  styleUrls: ['./create-diagnostico.page.scss'],
})
export class CreateDiagnosticoPage implements OnInit {

  



  constructor( 
    private route: ActivatedRoute, 
    public router: Router, 
    //public auth: AuthenticationService,
    private nav: NavController) { }

  ngOnInit() {
  }

}
