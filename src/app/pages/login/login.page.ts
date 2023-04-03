import { Component, Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import {Network, ConnectionStatus} from '@capacitor/network';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
@Injectable()
export class LoginPage implements OnInit{
  login: any = { usuario: '', password: ''};
  remember: boolean = false;
  error_login: boolean = false;
  msgError: string = '';
  verPassword: boolean = false;
  isConnected = false;

  user_login: IUser = {
    usuario: '',
    password: ''
  };

  constructor(private serviceLogin: LoginService,
              private router: Router,
              private storageService: StorageService,
              private translateService: TranslateService,
              private change: ChangeDetectorRef) {}
  ngOnInit() {
   Network.getStatus()
   .then( (status: ConnectionStatus) => {
      this.isConnected = status.connected;
   });

   this.storageService.getObject('user_login_remember')
    .then(remember_login => {
      if(remember_login){
        if(remember_login['remember']){
          this.login.usuario = remember_login['usuario'],
          this.login.password = remember_login['password']
        }else{
          this.login.usuario = '',
          this.login.password = ''
        }
      }
    });
    
  }

  loginUser(){
    this.error_login = false;

    if(this.isConnected){
      this.serviceLogin.showLoading();
      this.storageService.clear()
      .then( () => {
        this.serviceLogin.serviceLoginPda(this.login)
        .subscribe( resloginPda => {
          if(resloginPda.data)
            var data = resloginPda.data;
            this.serviceLogin.hideLoading();
            switch(data.codigo){
              case 200:{
                if(this.remember){
                  //Recordamos usuario y contraseña
                  this.storageService.setObject('user_login_remember', {
                    usuario: this.login.usuario,
                    password: this.login.password,
                    remember: this.remember
                  });
                }else{
                  this.storageService.setObject('user_login_remember', {
                    remember: false
                  });
                }
                //Guardamos token generado y usuario recogido             
                this.storageService.setObject('user', {
                  usuario: data.usuario,
                  token: data.token
                });       
                this.storageService.setObject('lactantes_list', {
                  offline: data
                });

            
                this.router.navigate(['/home']);
              }
              break;
              case 401:
              case 404:{
                this.error_login = true;
                this.msgError = data.mensaje;
              }
              break;
            }
        })

      });  
    }else{
      this.storageService.getObject('lactantes_list')
      .then(res => {
        if(res['offline']){
          if(res['offline'].usuario.email == this.login.usuario){
            this.router.navigate(['/home']);
          }
        }
      });
    }
  }

  toggleModePassword(){
    const input = document.getElementById('passwordType') as HTMLInputElement;
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    this.verPassword = !this.verPassword;
  }

}
