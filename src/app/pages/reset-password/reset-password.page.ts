import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/login/authentication.service'
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  correo: string

  constructor(private auth: AuthenticationService, private alert: AlertController) { }

  ngOnInit() {
  }

  async redirect(){

    const message = this.auth.resetPassword(this.correo)

    console.log(message)

    message.then(async msg => {

      if(msg == true){

        const alert = await this.alert.create({
          header: 'Listo!',
          message: 'Correo enviado, revise su bandeja de entrada',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });
    
        await alert.present()
    
        console.log('puta')
  
  
      }else{
  
        const alert = await this.alert.create({
          header: 'Ups!',
          message: 'Parece que el correo ingresado no es el correcto',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });
    
        await alert.present()
  
        console.log('tu madre')
  
      }

    })
  }
}
