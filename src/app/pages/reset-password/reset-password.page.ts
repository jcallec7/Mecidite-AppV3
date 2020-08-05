import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/login/authentication.service'
import { AlertController } from '@ionic/angular';

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

  redirect(){

    const messege = this.auth.resetPassword(this.correo)
    console.log('RESET:', messege)

  }

}
