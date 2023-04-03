import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { LactanteService } from 'src/app/services/lactante.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-notif-tomas',
  templateUrl: './notif-tomas.page.html',
  styleUrls: ['./notif-tomas.page.scss'],
})
export class NotifTomasPage implements OnInit {
  user_login: IUser = {
    usuario: '',
    password: ''
  };
  msgError: string = '';

  constructor(private router: Router,
              private storageService: StorageService,
              private lactanteService: LactanteService,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  clickCerrar(){
    this.loginService.showLoading();
    this.storageService.getObject('lactante_validate')
   .then(res => {
    if(res){
      this.storageService.getObject('user')
      .then(user => {
        if(user['token']){
          this.lactanteService.servicePostLactanteValidate(user['token'], res[0])
          .subscribe(result => {
            if(result){
              if(result.data.actualizacion.administrada){
                this.loginService.hideLoading();
                this.storageService.getObject('user_login_remember')
                .then(login => {
                  if(login){
                    this.user_login.usuario = login['usuario'];
                    this.user_login.password = login['password'];
                  }           
                })
                .finally(() => {
                  this.loginService.serviceLoginPda(this.user_login)
                  .subscribe( resloginPda => {
                    if(resloginPda.data){
                        var data = resloginPda.data;   
                        console.log(data);    
                        switch(data.codigo){
                          case 200:{
                            this.loginService.hideLoading();
                            this.storageService.setObject('user', {
                              usuario: data.usuario,
                              token: data.token
                            });       
                            this.storageService.setObject('lactantes_list', {
                              offline: data
                            }).finally(() => {
                              this.storageService.removeItem('administracion_online')
                              .finally(() => {
                                this.storageService.removeItem('user_tomas')
                                .finally(() => {
                                  this.loginService.hideLoading();
                                  this.router.navigate(['/home']);
                                })
                              });        
                            });
                          }
                          break;
                          case 401:
                          case 404:{
                            this.loginService.hideLoading();
                            this.msgError = data.mensaje;
                            this.router.navigate(['/home']);
                          }
                          break;
                        }  
                    }
                  });
                });
              }
            }
          });          
        }
        
      })
      
    }
   });
  }
}
