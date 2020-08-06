import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router, private alert: AlertController) { }

  correo: string
  contrasena: string
  showPassword = false
  passwordToggleIcon = 'eye-outline'

  ngOnInit() {
  }

  togglePassword(){

    this.showPassword = !this.showPassword;

    if(this.showPassword==false){

      this.passwordToggleIcon = 'eye-outline'

    }else{

      this.passwordToggleIcon = 'eye-off-outline'

    }
    
  }

  async redirect(){
    
    const message = this.auth.emailPasswordLogin(this.correo, this.contrasena)

    message.then(async msg => {

      if(msg == false){

        const alert = await this.alert.create({
          header: 'Ups!',
          message: 'Revisa tu información, parece no ser la correcta',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });
  
        await alert.present()
  
      }else{
  
        this.router.navigate(["home"])
        console.log('Login exitoso')
  
        
  
      }


    })

    

    
    

  }

}
