import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdministracion, IBotes, ILactante, ITomas } from 'src/app/interfaces/botes';
import { LactanteService } from 'src/app/services/lactante.service';
import {Network, ConnectionStatus} from '@capacitor/network';
import { StorageService } from 'src/app/services/storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-recipiente',
  templateUrl: './recipiente.page.html',
  styleUrls: ['./recipiente.page.scss'],
})
export class RecipientePage implements OnInit {
  botes: IBotes[] = [];
  tomas: ITomas;
  show_ok: boolean = false;
  isConnected: boolean = false;
  isConnectedText: string = '';
  correctBotes = [];
  codigoToma: number = -1;

  lactantes: ILactante[] = []
  administraciones: IAdministracion[] = [];
  tipo: string = '';


  constructor(private router: Router,
              private lactactanteService: LactanteService,
              private storageService: StorageService,
              private loginService: LoginService) { }

  ngOnInit() {
    Network.getStatus()
   .then( (status: ConnectionStatus) => {
      this.isConnected = status.connected;
   })
  }
  
  ionViewWillEnter(){
    this.botes = [];  
    this.correctBotes = [];
    this.administraciones = [];
    this. codigoToma = -1;

    let nombre, apellidos, numero_pulsera, recipienteACodigoBarras, recipienteATipo, recipienteBCodigoBarras, recipienteBTipo, errorBote1, errorBote2;
    let recipienteAVolumen, recipienteBVolumen;
    let horaToma = null;
    let administrada = null;
    
    this.lactactanteService.serviceGetStoreTomas()
      .then(tomas => {
        if(tomas.tomas){
          this.botes = tomas.tomas.botes;     
            this.isConnectedText = 'Sin conexión';
            
            if(!this.isConnected){      
              this.storageService.getObject('lactantes_list')
              .then(res => {
                if(res != null){
                  if(res['offline']){
                    this.lactantes = res['offline'].lactantes;
                    console.log(this.lactantes)
                    if(Array.isArray(this.lactantes)){
                      this.lactantes.forEach(element => {
                        if(element['administraciones'].length > 0){
                          if(Array.isArray(element['administraciones'])){
                            element['administraciones'].forEach(bote => {

                              if(this.botes[0] != null){
                                if((bote.recipienteACodigoBarras == this.botes[0].codigo) || (bote.recipienteBCodigoBarras == this.botes[0].codigo)){
                                  this.codigoToma = bote.id;
                                  horaToma = bote.horaToma;
                                  recipienteACodigoBarras = bote.recipienteACodigoBarras;
                                  recipienteATipo = bote.recipienteATipo;
                                  recipienteAVolumen = bote.recipienteAVolumen;
                                  recipienteBCodigoBarras = bote.recipienteBCodigoBarras;
                                  recipienteBTipo = bote.recipienteBTipo;
                                  recipienteBVolumen = bote.recipienteBVolumen;
                                  this.correctBotes[0] = true;
                                  
                                }
                              }
                              if(this.botes[1] != null){
                                if(this.codigoToma != -1){
                                  if((bote.recipienteACodigoBarras == this.botes[1].codigo) || (bote.recipienteBCodigoBarras == this.botes[1].codigo)){
                                    if(bote.id == this.codigoToma){
                                      recipienteBCodigoBarras = bote.recipienteBCodigoBarras;
                                      recipienteBTipo = bote.recipienteBTipo;
                                      recipienteBVolumen = bote.recipienteBVolumen;
                                      this.correctBotes[1] = true;
      
                                      this.administraciones.push({
                                        "horaToma": horaToma,
                                        "recipienteACodigoBarras": recipienteACodigoBarras,
                                        "recipienteATipo": recipienteATipo,
                                        "recipienteAVolumen": recipienteAVolumen,
                                        "recipienteBCodigoBarras": recipienteBCodigoBarras,
                                        "recipienteBTipo": recipienteBTipo,
                                        "recipienteBVolumen": recipienteBVolumen,
                                        "errorBote1": this.correctBotes[0],
                                        "errorBote2": this.correctBotes[1]
                                      });  
                                    }
                                  }
                                }
                              }
                            });
                          }
                        }
                      });
      
                      if(this.botes.length > 0){
                        if((this.correctBotes[0] == null) || (this.correctBotes[1] == null)){
      
                          if(this.correctBotes[0] == null){
                            this.correctBotes[0] = false;
                          }
                          if(this.correctBotes[1] == null){
                            this.correctBotes[1] = false;
                          }

                          this.administraciones.push({
                            "horaToma": horaToma != null ? horaToma : new Date,
                            "recipienteACodigoBarras": this.botes[0] != null ? this.botes[0].codigo : '',
                            "recipienteATipo": recipienteATipo != '' ? recipienteATipo : '',
                            "recipienteAVolumen": recipienteAVolumen != '' ? recipienteAVolumen : '',
                            "recipienteBCodigoBarras": this.botes[1] != null ? this.botes[1].codigo : '',
                            "recipienteBTipo": recipienteBTipo != '' ? recipienteBTipo : '',
                            "recipienteBVolumen": recipienteBVolumen,
                            "errorBote1": this.correctBotes[0],
                            "errorBote2": this.correctBotes[1]
                          });
                          
                        
                        }
                      }
                    }
                  }
                } 
              });

            }else{
              this.storageService.getObject('administracion_online')
              .then(res => {
                if(res['administracion'][0]){
                  let administracionToma = res['administracion'][0];
                    if(this.botes[0] != null){
                      if((administracionToma.recipienteACodigoBarras == this.botes[0].codigo) || (administracionToma.recipienteBCodigoBarras == this.botes[0].codigo)){
                        this.codigoToma = administracionToma.id;
                        horaToma = administracionToma.horaToma;
                        administrada = administracionToma.administrada;
                        recipienteACodigoBarras = administracionToma.recipienteACodigoBarras;
                        recipienteATipo = administracionToma.recipienteATipo;
                        recipienteAVolumen = administracionToma.recipienteAVolumen;
                        recipienteBCodigoBarras = administracionToma.recipienteBCodigoBarras;
                        recipienteBTipo = administracionToma.recipienteBTipo;
                        recipienteBVolumen = administracionToma.recipienteBVolumen;
                        this.correctBotes[0] = true;
                      }
                    }
  
                    if(this.botes[1] != null){
                      if(this.codigoToma != -1){
                        if((administracionToma.recipienteACodigoBarras == this.botes[1].codigo) || (administracionToma.recipienteBCodigoBarras == this.botes[1].codigo)){
                          if(administracionToma.id == this.codigoToma){
                            recipienteBCodigoBarras = administracionToma.recipienteBCodigoBarras;
                            recipienteBTipo = administracionToma.recipienteBTipo;
                            recipienteBVolumen = administracionToma.recipienteBVolumen;         
                            this.correctBotes[1] = true;
  
                            this.administraciones.push({
                              "horaToma": horaToma,
                              "administrada": administrada,
                              "recipienteACodigoBarras": recipienteACodigoBarras,
                              "recipienteATipo": recipienteATipo,
                              "recipienteAVolumen": recipienteAVolumen,
                              "recipienteBCodigoBarras": recipienteBCodigoBarras,
                              "recipienteBTipo": recipienteBTipo,
                              "recipienteBVolumen": recipienteBVolumen,
                              "errorBote1": this.correctBotes[0],
                              "errorBote2": this.correctBotes[1]
                            });  

                          }
                        }
                      }
                    }
  
                      if(this.botes.length > 0){
                        if((this.correctBotes[0] == null) || (this.correctBotes[1] == null)){
          
                          if(this.correctBotes[0] == null){
                            this.correctBotes[0] = false;
                          }
                          if(this.correctBotes[1] == null){
                            this.correctBotes[1] = false;
                          }
    
                          if(this.botes.length == 1){
                            if(this.botes[0].codigo == administracionToma.recipienteACodigoBarras){
                              this.tipo = "tipoA";
                            }
                            if(this.botes[0].codigo == administracionToma.recipienteBCodigoBarras){
                              this.tipo = "tipoB";
                            }
                          }else{
                            this.tipo = "";
                          }
                          
                          this.administraciones.push({
                            "horaToma": horaToma != null ? horaToma : new Date,
                            "recipienteACodigoBarras": this.botes[0] != null ? this.botes[0].codigo : '',
                            "administrada": administrada,
                            "recipienteATipo": recipienteATipo != '' ? recipienteATipo : '',
                            "recipienteAVolumen": recipienteAVolumen != 0 ? recipienteAVolumen : 0,
                            "recipienteBCodigoBarras": this.botes[1] != null ? this.botes[1].codigo : '',
                            "recipienteBTipo": recipienteBTipo != '' ? recipienteBTipo : '',
                            "recipienteBVolumen": recipienteBVolumen != 0 ? recipienteBVolumen : 0,
                            "errorBote1": this.correctBotes[0],
                            "errorBote2": this.correctBotes[1]
                          });

                          console.log(this.administraciones);
                      }
                    }                 
                }
              });
            }
        }
      });
    
  }

  clickContinuar(){
    this.router.navigate(['/escaner-bebe']);
  }

  clickReturnScan(){
    let administracion: IBotes[] = this.botes;
    console.log(this.codigoToma == -1);
    if((this.codigoToma != -1) && (!this.correctBotes[1]) && (this.botes.length > 1)){
      this.tomas = {
        lactante: null,
        botes: [{'codigo': administracion[0].codigo}]
      }
      this.storageService.setObject('user_tomas', {
        tomas: this.tomas
      });
      
      this.router.navigate(['/escaner']);
     
    }else{
      if(this.codigoToma == -1 || this.codigoToma == null){
        this.storageService.removeItem('user_tomas')
        .finally(() => {
          this.router.navigate(['/escaner']);
        });
      }else{
        this.router.navigate(['/escaner']);
      } 
    }
  }

  onClickSalir(){
    this.loginService.presentAlertConfirm();
  }

}
