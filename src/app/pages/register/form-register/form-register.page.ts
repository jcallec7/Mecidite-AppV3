import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';
import { Rol } from 'src/app/model/Rol';
import { AlertController } from '@ionic/angular';

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

  messageEmail = ""

  showMessage = true
  
  constructor(private route: ActivatedRoute, private router: Router, private RegisterService: RegisterService, private alert: AlertController) { }

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
      tipoSangre:"",
      direccion: "",
      peso: "",
      estatura: "",
      rol: this.rol[0].uid,
      photoURL: ""
  
    }

    if(this.rol[0].uid=='2'){
      this.showCard =  true
    }else{
      this.showCard = false
    }

    console.log("subscribe",this.rol[0].descripcion)
    
  }

  async redirect(){

    if(this.usuario.cedula!="" && this.usuario.nombre!="" && this.usuario.apellido!="" && this.email != "" && 
    this.password!="" && this.usuario.fecha_nac!="" && this.usuario.direccion!="" && this.usuario.telf!="" && 
    this.usuario.sexo!= "" && this.usuario.peso!="" && this.usuario.estatura!="" && this.usuario.tipoSangre!=""){

      this.RegisterService.insertUsuario(this.usuario, this.email, this.password)
    
      this.router.navigate(['home'])


    }else if(this.usuario.cedula!="" && this.usuario.nombre!="" && this.usuario.apellido!="" && this.email != "" && 
    this.password!="" && this.usuario.fecha_nac!="" && this.usuario.direccion!="" && this.usuario.telf!="" && 
    this.usuario.sexo!= "" && this.usuario.especialidad!=""){

      this.RegisterService.insertUsuario(this.usuario, this.email, this.password)
    
      this.router.navigate(['home'])


    }else{

      const alert = await this.alert.create({
        header: 'Ups!',
        message: 'Necesitas llenar toda tu información',
        buttons: [
          {
            text: 'OK'
          }
        ],
      });
  
      await alert.present()

      
    }
  }

  togglePassword(){

    this.showPassword = !this.showPassword;

    if(this.showPassword==false){

      this.passwordToggleIcon = 'eye-outline'

    }else{

      this.passwordToggleIcon = 'eye-off-outline'

    }
    
  }

  async checkEmail(){

    const check = this.RegisterService.checkEmail(this.email)

    ;(await check).subscribe(data=>{
      console.log(data[0])
      if(data[0]!=undefined){

        this.showMessage = false
        this.messageEmail="El correo que usted ingresó ya se encuentra registrado"

      }else{
        this.showMessage = true
      }
    })

    
   


  }

}
