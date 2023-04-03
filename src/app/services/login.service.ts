import { Http, HttpOptions } from '@capacitor-community/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loading: any = null;

  constructor(private loadingController: LoadingController, 
              private alertController: AlertController,
              private storageService: StorageService,
              private router: Router) {}

  serviceLogin(user:IUser): Observable<any>{

    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/auth/login'),
      method: 'POST',
      data: user,
      headers:{
        'Content-Type': 'application/json'
      },
      responseType: "json"
    };
    return from(Http.post(options));
  }

  serviceLoginPda(user:IUser): Observable<any>{

    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/auth/login-pda'),
      method: 'POST',
      data: user,
      headers:{
        'Content-Type': 'application/json'
      },
      responseType: "json"
    };
    return from(Http.post(options));
  }

  showLoading = async () => {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'circles',
      cssClass: ''
    });
    this.loading.present();
  }

  hideLoading = async () => {
    if(this.loading != null){
      this.loading.dismiss();
    }
    this.loadingController.dismiss();
  }

  

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'información',
      message: msg,
      cssClass: 'my-class-alert',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: 'Está a punto de salir sin guardar los cambios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          handler: () => {
            this.storageService.setObject('lactantes_list', {
              offline: null
            })
            .then(() => {
              this.router.navigate(['/login']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
