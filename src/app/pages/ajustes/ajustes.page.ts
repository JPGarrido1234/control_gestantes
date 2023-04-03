import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdiomasService } from 'src/app/services/idiomas.service';
import { LoginService } from 'src/app/services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  //Translate
  ajustes: string = '';
  public token: string = '';
  public idioma_user: string = '';
  public arr_idiomas = [];
  selectedLanguage: string = '';

  constructor(private idiomaService: IdiomasService,
              private serviceLogin: LoginService,
              private router: Router,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.serviceLogin.showLoading();
    this.idiomaService.serviceGetStoreUser()
    .then(res => {
      if(res){
        //Lista idiomas disponibles
        this.idiomaService.serviceGetLenguages(res['token'])
        .subscribe(res => {
          if(res.status == 200){
            if(res.data){
              this.arr_idiomas = res.data;
            }
          }
        });
        //Idioma usuario
        this.idiomaService.serviceGetLenguageUser(res['usuario'].id)
        .subscribe(res => {
          if(res.status == 200){
            if(res.data){
              this.idioma_user = res.data.descripcion;
              this.serviceLogin.hideLoading();
            }
          }else{
            this.serviceLogin.hideLoading();
            this.router.navigate(['/login']);
          }
        });
      }
    })
  }

  initTranslate(lang: string){
    if(lang == 'en'){
      this.translateService.use('en');
      this.translateService.setTranslation('en', {
          "ajustes.ajustes": "Settings",
          "ajustes.txt_idiomas": "Idiom"
      }, true);
    }else{
      this.translateService.use('es');
      this.translateService.setDefaultLang('es');
    }
  }

  getIdiomaAbre(idioma: string){
    if(idioma != ''){
      switch(idioma){
        case 'Castellano':{
          return 'es';
        }
        case 'Inglés':{
          return 'en';
        }
        default:
          return 'es';
      }
    }
  }

  languageChanged(){
    this.initTranslate(this.selectedLanguage);
  }
}
