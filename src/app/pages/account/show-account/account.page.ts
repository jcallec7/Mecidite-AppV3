import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/login/authentication.service';
import { Usuario } from 'src/app/model/Usuario';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {


  usuario =  new Usuario()
  showDisplayName = false

  constructor( private nav: NavController, private auth: AuthenticationService, private AccountServices: AccountService) { }

  ngOnInit() {

    this.auth.getCurrentUser().then(user=>{

      this.AccountServices.getUsuario(user.uid).subscribe(data=>{
        
        this.usuario = data

        console.log(this.usuario.rol)

        if (this.usuario.rol=='2'){
          this.showDisplayName = true
        }else{
          this.showDisplayName = false 
        }

        

      })

      


    })

  }

  goBack() {
    this.nav.back();
  }


}
