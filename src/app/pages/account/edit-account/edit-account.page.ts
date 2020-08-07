import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {

  constructor(private AccountServices: AccountService, private auth: AuthenticationService, private nav: NavController) { }

  usuario =  new Usuario()
  showItem = false

  ngOnInit() {

    this.auth.getCurrentUser().then(user=>{

      this.AccountServices.getUsuario(user.uid).subscribe(data=>{
        
        this.usuario = data

        console.log(this.usuario.rol)

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

    this.AccountServices.updateUsuario(this.usuario)

  }

  setImage(data:any){

    this.usuario.photoURL = data.url

  }

}
