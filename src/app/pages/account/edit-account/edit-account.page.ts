import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {

  constructor(private AccountServices: AccountService, private auth: AuthenticationService, private nav: NavController, private alert: AlertController, private router: Router) { }

  usuario =  new Usuario()
  showItem = false

  ngOnInit() {

    this.auth.getCurrentUser().then(user=>{

      this.AccountServices.getUsuario(user.uid).subscribe(data=>{
        
        this.usuario = data

        console.log(this.usuario.uid)

        if (this.usuario.rol=='2'){
          this.showItem = true
        }else{
          this.showItem = false 
        }

        

      })

      


    })
  }

  goBack() {
    this.nav.back();
  }

  updateUser(){

    

    const message = this.AccountServices.updateUsuario(this.usuario)

    message.then(async msg => {

      if(msg == false){

        const alert = await this.alert.create({
          header: 'Lo sentimos!',
          message: 'Algo sucedio, no se pudo actualizar sus datos, contactese con los proveedores.',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });
  
        await alert.present()
  
      }else{

        const alert = await this.alert.create({
          header: 'Listo!',
          message: 'Actualización completa.',
          buttons: [
            {
              text: 'OK'
            }
          ],
        });
  
        await alert.present()
  
        this.router.navigate(["show-account"])
        console.log('Edicion exitosa')
  
        
  
      }


    })

  }

  setImage(data:any){

    this.usuario.photoURL = data.url

  }

}
