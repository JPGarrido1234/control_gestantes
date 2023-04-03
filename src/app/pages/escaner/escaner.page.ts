import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITomas, IBotes, IAdministracion } from 'src/app/interfaces/botes';
import { LactanteService } from 'src/app/services/lactante.service';
import { StorageService } from 'src/app/services/storage.service';
import {Network, ConnectionStatus} from '@capacitor/network';


@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {
  botes: IBotes[] = [];
  tomas: ITomas;
  scanActive: boolean = false;
  isConnected: boolean = false;
  msgError: string = '';
  administraciones: IAdministracion[] = [];

  bote: IBotes = {
    codigo: ''
  };
  constructor(private router: Router,
              private storageService: StorageService,
              private lactanteService: LactanteService) {}
  ngOnInit(): void { 
    Network.getStatus()
    .then( (status: ConnectionStatus) => {
      this.isConnected = status.connected;
    });
  }

  ionViewWillEnter(){
    this.bote.codigo = '';
    console.log(this.botes.length);
  }

  startScan(){
    this.administraciones = [];
    this.botes = [];
    if(this.bote.codigo != ''){
      this.lactanteService.serviceGetStoreTomas()
      .then(tomas => {
        if(tomas){
          this.tomas = tomas.tomas;
          this.botes = tomas.tomas.botes;
        }
      })
      .finally(() => {
        if(!this.checkRecipienteExistence(this.bote.codigo)){
          if(this.isConnected){
            this.storageService.getObject('lactantes_list')
            .then(res => {
              if(res['offline'].token != null){
                this.lactanteService.serviceGetLactanteOnline(res['offline'].token, this.bote.codigo)
                .subscribe(data => {
                  if(data){
                    switch(data.status){
                      case 200: {
                        if(!data.data.administracion.administrada){

                          this.userScanAddBote(this.bote.codigo);

                          if(this.bote.codigo == data.data.administracion.recipienteACodigoBarras){ //A
                            this.storageService.setObject('volumenRecipientes', {
                              volumenA: data.data.administracion.recipienteAVolumen,
                              volumenB: 0
                            });
                          }
                          if(this.bote.codigo == data.data.administracion.recipienteBCodigoBarras){ //B
                            this.storageService.setObject('volumenRecipientes', {
                              volumenA: 0,
                              volumenB: data.data.administracion.recipienteBVolumen
                            });
                          }

                          this.administraciones.push({
                            "id": data.data.administracion.id,
                            "horaToma": new Date,
                            "administrada": data.data.administracion.administrada,
                            "recipienteACodigoBarras": data.data.administracion.recipienteACodigoBarras,
                            "recipienteATipo": data.data.administracion.recipienteATipo,
                            "recipienteAVolumen": data.data.administracion.recipienteAVolumen,
                            "recipienteBCodigoBarras": data.data.administracion.recipienteBCodigoBarras,
                            "recipienteBTipo": data.data.administracion.recipienteBTipo,
                            "recipienteBVolumen": data.data.administracion.recipienteBVolumen
                          });  

                          this.storageService.setObject('administracion_online', {
                            administracion: this.administraciones
                          }).then(() => {
                            this.router.navigate(['/recipiente']);
                          });     
                        }else{
                          this.bote.codigo = '';
                        }                                                        
                        
                      }
                      break;
                      case 401:
                      case 400:
                      case 404: {
                        if(this.botes.length == 0){
                          this.storageService.getObject('volumenRecipientes')
                          .then((volumen) => {
                            if(volumen){
                              this.administraciones.push({
                                "id": null,
                                "horaToma": new Date,
                                "administrada": null,
                                "recipienteACodigoBarras": '',
                                "recipienteATipo": '',
                                "recipienteAVolumen": volumen['volumenA'] != 0 ? volumen['volumenA'] : 0,
                                "recipienteBCodigoBarras": '',
                                "recipienteBTipo": '',
                                "recipienteBVolumen": volumen['volumenB'] != 0 ? volumen['volumenB'] : 0,
                                "errorBote1": true,
                                "errorBote2": false
                              }); 
                            }else{
                              this.administraciones.push({
                                "id": null,
                                "horaToma": new Date,
                                "administrada": null,
                                "recipienteACodigoBarras": this.bote.codigo,
                                "recipienteATipo": '',
                                "recipienteAVolumen": 0,
                                "recipienteBCodigoBarras": '',
                                "recipienteBTipo": '',
                                "recipienteBVolumen": 0,
                                "errorBote1": true,
                                "errorBote2": false
                              }); 
                            }

                            this.userScanAddBote(this.bote.codigo);
                            this.storageService.setObject('administracion_online', {
                              administracion: this.administraciones
                            }).then(() => {
                              this.router.navigate(['/recipiente']);
                            });

                          }); 
                        }else{
                          this.storageService.getObject('volumenRecipientes')
                          .then((volumen) => {
                            if(volumen){
                              this.administraciones.push({
                                "id": null,
                                "horaToma": new Date,
                                "administrada": null,
                                "recipienteACodigoBarras": this.botes[0].codigo,
                                "recipienteATipo": '',
                                "recipienteAVolumen": volumen['volumenA'] != 0 ? volumen['volumenA'] : 0,
                                "recipienteBCodigoBarras": '',
                                "recipienteBTipo": '',
                                "recipienteBVolumen": volumen['volumenB'] != 0 ? volumen['volumenB'] : 0,
                                "errorBote1": true,
                                "errorBote2": true
                              }); 
                              
                              this.userScanAddBote(this.bote.codigo);

                              this.storageService.setObject('administracion_online', {
                                administracion: this.administraciones
                              }).then(() => {
                                this.router.navigate(['/recipiente']);
                              });
                            }    
                          });
                          
                        }
                      }
                    }  
                  }
                });
              }else{
                this.router.navigate['/login'];
              }
            });

          }else{
            this.userScanAddBote(this.bote.codigo);
            this.router.navigate(['/recipiente']);
          } 

        }else{
          this.bote.codigo = '';
        }
        
        
      });
    }
  }

  userScanAddBote(bote: string){
    this.botes.push({"codigo": bote});
    this.tomas = {
      lactante: null,
      botes: this.botes
    }

    this.storageService.setObject('user_tomas', {
      tomas: this.tomas
    });
  }

  checkRecipienteExistence(boteInput: string):boolean {
    return this.botes.some(r => r.codigo === boteInput);
  }

}
