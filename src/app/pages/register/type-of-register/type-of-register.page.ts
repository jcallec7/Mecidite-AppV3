import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from 'src/app/services/register/register.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-type-of-register',
  templateUrl: './type-of-register.page.html',
  styleUrls: ['./type-of-register.page.scss'],
})
export class TypeOfRegisterPage implements OnInit {

  rol: Observable<any[]>

  constructor(private RegisterServices: RegisterService, private router: Router) { }

  ngOnInit() {
  
  }

  redirectPaciente(){

    this.rol = this.RegisterServices.getRol("3")

    this.rol.subscribe(data => {
      let extras: NavigationExtras={
        state:{
          rol: data
        }
      }
      this.router.navigate(['form-register'],extras)
    }) 
  }

  redirectMedico(){

    this.rol = this.RegisterServices.getRol("2")

    this.rol.subscribe(data => {
      let extras: NavigationExtras={
        state:{
          rol: data
        }
      }
      this.router.navigate(['form-register'],extras)
      console.log("subscribe",extras)
    }) 
  }
}

