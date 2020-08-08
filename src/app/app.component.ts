import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    private router: Router
 
  
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#3F51B5');

      this.auth.getCurrentUser().then(user=>{
        console.log("UID CURRENT SESSION", user)
        if(user){

          this.appPages = [
            {
              title: 'Iniciar Sesión',
              url: 'login',
              icon: 'home'
            },
            {
              title: 'Recuperar Contraseña',
              url: 'reset-password',
              icon: 'person'
            },   
            {
         
              title: 'Registrarse',
              url: 'type-of-register',
              icon: 'settings'
            }
          ]
          
          this.router.navigate(['home'])
          
        }else{

          this.appPages = [
            {
              title: 'Inicio',
              url: 'home',
              icon: 'home'
            },
            {
              title: 'Perfil',
              url: 'show-account',
              icon: 'person'
            },   
            {
         
              title: 'Configuración',
              url: '/folder/Favorites',
              icon: 'settings'
            },
            {
              title: 'Contáctanos',
              url: 'contactanos',
              icon: 'archive'
            },
            {
              title: 'Nueva Consulta',
              url: '/create-consulta',
              icon: 'add'
            },
            {
              title: 'Mis Consultas',
              url: '/list-consulta',
              icon: 'list'
            },
          ]
          
         //this.router.navigate(['welcome'])
        }

      }
      )
    });


  }

  ngOnInit() {
    const path = window.location.pathname.split('welcome')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  

}
