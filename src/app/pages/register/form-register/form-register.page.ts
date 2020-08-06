import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';
import { Rol } from 'src/app/model/Rol';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.page.html',
  styleUrls: ['./form-register.page.scss'],
})
export class FormRegisterPage implements OnInit {

  rol: Rol
  
  usuario: Usuario

  showPassword = false

  showCard = false

  password: string

  email: string

  passwordToggleIcon = 'eye-outline'
  
  constructor(private route: ActivatedRoute, private router: Router, private RegisterService: RegisterService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.rol = this.router.getCurrentNavigation().extras.state.rol
      
    })

    this.usuario = {

      uid: "",
      cedula: "",
      nombre: "",
      apellido: "",
      sexo: "",
      fecha_nac: "",
      especialidad: "",
      telf: "",
      direccion: "",
      peso: "",
      estatura: "",
      rol: this.rol
  
    }

    if(this.rol[0].uid=='2'){
      this.showCard =  true
    }else{
      this.showCard = false
    }

    console.log("subscribe",this.rol[0].descripcion)
    
  }

  redirect(){

    this.RegisterService.insertUsuario(this.usuario, this.rol[0].descripcion, this.email, this.password)
    
    this.router.navigate(['home'])


  }

  getImage(data:any){

    console.log(data)

  }

  togglePassword(){

    this.showPassword = !this.showPassword;

    if(this.showPassword==false){

      this.passwordToggleIcon = 'eye-outline'

    }else{

      this.passwordToggleIcon = 'eye-off-outline'

    }
    
  }

}
