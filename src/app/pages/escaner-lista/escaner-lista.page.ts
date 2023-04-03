import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdministracion, IBotes, ILactante, ITomas } from 'src/app/interfaces/botes';
import { LactanteService } from 'src/app/services/lactante.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import {Network, ConnectionStatus} from '@capacitor/network';

@Component({
  selector: 'app-escaner-lista',
  templateUrl: './escaner-lista.page.html',
  styleUrls: ['./escaner-lista.page.scss'],
})
export class EscanerListaPage implements OnInit {
  tomas: ITomas = null;
  botes: IBotes[] = [];
  lactante: ILactante = null;
  botesIncorrectos: IBotes[] = [];
  botesCorrectos: IBotes[] = [];
  isConnected: boolean = false;
  isConnectedText: string = '';

  //OFFLINE
  array_lactantes: Array<ILactante> = [];
  administraciones: IAdministracion[] = [];
  showLactante: string = 'lactante-';
  iconAbrir: string = 'iconAbrir-';
  iconCerrar: string = 'iconCerrar-';
  
  lactantes: ILactante[] = [];
  existLactante: boolean = false;
  existBotes: boolean = false; 
  unBoteOk: boolean = false;

  correctBotes = [];
  codigoToma: number = -1;
  tipo: string = '';

  constructor(private lactanteService: LactanteService,
              private loginService: LoginService,
              private router: Router,
              private storageService: StorageService) { }

  ngOnInit() {
    Network.getStatus()
    .then( (status: ConnectionStatus) => {
      this.isConnected = status.connected;
    });
  }

  ionViewWillEnter(){
    this.botes = [];
    this.array_lactantes = [];
    this.correctBotes = [];
    this. codigoToma = -1;
    let lactante_id, nombre, codigo, apellidos, numero_pulsera, recipienteACodigoBarras, recipienteATipo, recipienteBCodigoBarras, recipienteBTipo = '';
    let recipienteAVolumen, recipienteBVolumen = null;
    let horaToma = null;
    this.administraciones = [];
/*
    Network.addListener('networkStatusChange', status => {
      //console.log('Network status changed', status);
      this.isConnected = status.connected;
      console.log('Network status changed', status);
    });
*/
    this.lactanteService.serviceGetStoreTomas()
    .then(tomas => {
      if(tomas){
        //Lo que hemos ido introduciendo bote1, bote2 y lactante
        this.tomas = tomas.tomas;
        this.botes = tomas.tomas.botes;

        this.storageService.getObject('lactantes_list')
        .then(res => {
          if(res['offline']){
            if(Array.isArray(res['offline'].lactantes)){

              if(!this.isConnected){
                this.lactantes = res['offline'].lactantes;
                this.lactantes.forEach(element => {
              
                  if(this.tomas.lactante == element.numero_pulsera){
                    this.existLactante = true; 
                    lactante_id = element.id;
                    codigo = element.codigo;
                    nombre = element.nombre;
                    apellidos = element.apellidos;
                    numero_pulsera = element.numero_pulsera;
                    
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
                            }
                          }
                          if(this.botes[1] != null){
                            if(this.codigoToma != -1){
                              if((bote.recipienteACodigoBarras == this.botes[1].codigo) || (bote.recipienteBCodigoBarras == this.botes[1].codigo)){
                                if(bote.id == this.codigoToma){
                                  this.existBotes = true;
                                  this.unBoteOk = true;
                                  recipienteBCodigoBarras = bote.recipienteBCodigoBarras;
                                  recipienteBTipo = bote.recipienteBTipo;
                                  recipienteBVolumen = bote.recipienteBVolumen;
  
                                  this.administraciones.push({
                                    "id": this.codigoToma,
                                    "horaToma": horaToma,
                                    "recipienteACodigoBarras": recipienteACodigoBarras,
                                    "recipienteATipo": recipienteATipo,
                                    "recipienteAVolumen": recipienteAVolumen,
                                    "recipienteBCodigoBarras": recipienteBCodigoBarras,
                                    "recipienteBTipo": recipienteBTipo,
                                    "recipienteBVolumen": recipienteBVolumen,
                                    "errorBote1": true,
                                    "errorBote2": true
                                  });
  
                                }else{
                                  this.existBotes = false;
                                  this.administraciones.push({
                                    "id": this.codigoToma,
                                    "horaToma": horaToma,
                                    "recipienteACodigoBarras": recipienteACodigoBarras,
                                    "recipienteATipo": recipienteATipo,
                                    "recipienteAVolumen": recipienteAVolumen,
                                    "recipienteBCodigoBarras": null,
                                    "recipienteBTipo": null,
                                    "recipienteBVolumen": null,
                                    "errorBote1": false,
                                    "errorBote2": false
                                  });
                                }
                              }
                            }
                          }
                        });
                      }
  
                      if((this.codigoToma != -1) && (!this.existBotes) && (this.botes.length > 1)){
                        this.administraciones.push({
                          "id": this.codigoToma,
                          "horaToma": horaToma != null ? horaToma : new Date,
                          "recipienteACodigoBarras": this.botes[0].codigo,
                          "recipienteATipo": recipienteATipo != '' ? recipienteATipo : '',
                          "recipienteAVolumen": recipienteAVolumen != '' ? recipienteAVolumen : '',
                          "recipienteBCodigoBarras": this.botes[1].codigo,
                          "recipienteBTipo": recipienteBTipo != '' ? recipienteBTipo : '',
                          "recipienteBVolumen": recipienteBVolumen != '' ? recipienteBVolumen : '',
                          "errorBote1": true,
                          "errorBote2": true
                        });
                      }else{
                        if((this.codigoToma != -1) && (!this.existBotes) && (this.botes.length == 1)){
                          this.unBoteOk = true;
                          this.administraciones.push({
                            "id": this.codigoToma,
                            "horaToma": horaToma != null ? horaToma : new Date,
                            "recipienteACodigoBarras": this.botes[0].codigo,
                            "recipienteATipo": recipienteATipo != '' ? recipienteATipo : '',
                            "recipienteAVolumen": recipienteAVolumen != '' ? recipienteAVolumen : '',
                            "recipienteBCodigoBarras": '',
                            "recipienteBTipo": recipienteBTipo != '' ? recipienteBTipo : '',
                            "recipienteBVolumen": recipienteBVolumen != '' ? recipienteBVolumen : '',
                            "errorBote1": true,
                            "errorBote2": true
                          });
                        }
                      }
  
                    }
  
                    
                    this.array_lactantes.push({
                      "id": lactante_id,
                      "codigo": codigo,
                      "nombre":nombre, 
                      "numero_pulsera": numero_pulsera, 
                      "apellidos": apellidos,
                      "administraciones": this.administraciones
                      });
                      
                  }
                  
                  if(this.array_lactantes.length > 0){
                    this.storageService.setObject('tomas_store', this.array_lactantes);
                  } 

                  if(!this.existLactante){
                    this.loginService.presentAlert('No existe lactante');
                    this.router.navigate(['/escaner-bebe']);
                  }

                });
              }else{
                if(res['offline'].token != null){
                  this.lactanteService.serviceGetPulseraOnline(res['offline'].token, this.tomas.lactante)
                  .subscribe(data => {
                    if(data.status == 200){
                      this.existLactante = true;
                      lactante_id = data.data.id;
                      codigo = data.data.codigo;
                      nombre = data.data.nombre;
                      apellidos = data.data.apellidos;
                      numero_pulsera = data.data.numero_pulsera;

                      this.storageService.getObject('administracion_online')
                      .then(res => {
                        if(res['administracion'][0] != null){
                          if(res['administracion'][0]){
                            let administracionToma = res['administracion'][0];
                            if(this.botes[0] != null){
                              if((administracionToma.recipienteACodigoBarras == this.botes[0].codigo) || (administracionToma.recipienteBCodigoBarras == this.botes[0].codigo)){
                                this.codigoToma = administracionToma.id;
                                horaToma = administracionToma.horaToma;
                                recipienteACodigoBarras = administracionToma.recipienteACodigoBarras;
                                recipienteATipo = administracionToma.recipienteATipo;
                                recipienteAVolumen = administracionToma.recipienteAVolumen;
                                recipienteBCodigoBarras = administracionToma.recipienteBCodigoBarras;
                                recipienteBTipo = administracionToma.recipienteBTipo;
                                recipienteBVolumen = administracionToma.recipienteBVolumen;
                              }
                            }
                            if(this.botes[1] != null){
                              if(this.codigoToma != -1){
                                if((administracionToma.recipienteACodigoBarras == this.botes[1].codigo) || (administracionToma.recipienteBCodigoBarras == this.botes[1].codigo)){
                                  if(administracionToma.id == this.codigoToma){
                                    this.existBotes = true;
                                    this.unBoteOk = true;
                                    recipienteBCodigoBarras = administracionToma.recipienteBCodigoBarras;
                                    recipienteBTipo = administracionToma.recipienteBTipo;
                                    recipienteBVolumen = administracionToma.recipienteBVolumen;
    
                                    this.administraciones.push({
                                      "id": this.codigoToma,
                                      "horaToma": horaToma,
                                      "recipienteACodigoBarras": recipienteACodigoBarras,
                                      "recipienteATipo": recipienteATipo,
                                      "recipienteAVolumen": recipienteAVolumen,
                                      "recipienteBCodigoBarras": recipienteBCodigoBarras,
                                      "recipienteBTipo": recipienteBTipo,
                                      "recipienteBVolumen": recipienteBVolumen,
                                      "errorBote1": true,
                                      "errorBote2": true
                                    });
    
                                  }else{
                                    this.existBotes = false;
                                    this.administraciones.push({
                                      "id": this.codigoToma,
                                      "horaToma": horaToma,
                                      "recipienteACodigoBarras": recipienteACodigoBarras,
                                      "recipienteATipo": recipienteATipo,
                                      "recipienteAVolumen": recipienteAVolumen,
                                      "recipienteBCodigoBarras": recipienteBCodigoBarras,
                                      "recipienteBTipo": null,
                                      "recipienteBVolumen": recipienteBVolumen,
                                      "errorBote1": false,
                                      "errorBote2": false
                                    });
                                  }
                                }
                              }
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

                            if((this.codigoToma != -1) && (!this.existBotes) && (this.botes.length > 1)){
                              this.administraciones.push({
                                "id": this.codigoToma,
                                "horaToma": horaToma != null ? horaToma : new Date,
                                "recipienteACodigoBarras": recipienteACodigoBarras,
                                "recipienteATipo": recipienteATipo != '' ? recipienteATipo : '',
                                "recipienteAVolumen": recipienteAVolumen != '' ? recipienteAVolumen : '',
                                "recipienteBCodigoBarras": recipienteBCodigoBarras,
                                "recipienteBTipo": recipienteBTipo != '' ? recipienteBTipo : '',
                                "recipienteBVolumen": recipienteBVolumen != '' ? recipienteBVolumen : '',
                                "errorBote1": true,
                                "errorBote2": true
                              });

                            }else{
                              if((this.codigoToma != -1) && (!this.existBotes) && (this.botes.length == 1)){
                                this.unBoteOk = true;
                                this.administraciones.push({
                                  "id": this.codigoToma,
                                  "horaToma": horaToma != null ? horaToma : new Date,
                                  "recipienteACodigoBarras": recipienteACodigoBarras,
                                  "recipienteATipo": recipienteATipo != '' ? recipienteATipo : '',
                                  "recipienteAVolumen": recipienteAVolumen != '' ? recipienteAVolumen : '',
                                  "recipienteBCodigoBarras": '',
                                  "recipienteBTipo": recipienteBTipo != '' ? recipienteBTipo : '',
                                  "recipienteBVolumen": recipienteBVolumen != '' ? recipienteBVolumen : '',
                                  "errorBote1": true,
                                  "errorBote2": true
                                });
                              }
                            }

                            console.log(administracionToma);
                            this.array_lactantes.push({
                              "id": lactante_id,
                              "codigo": codigo,
                              "nombre": nombre, 
                              "numero_pulsera": numero_pulsera, 
                              "apellidos": apellidos,
                              "administraciones": this.administraciones
                              });
                          }
                        }

                        if(this.array_lactantes.length > 0){
                          this.storageService.setObject('tomas_store', this.array_lactantes);
                        } 
                       
                      });           
                    }else{
                      this.existLactante = false; 
                      this.loginService.presentAlert('No existe lactante');
                      this.router.navigate(['/escaner-bebe']);
                    }
                  });
                }
              }

              

            } 

            
          }
        });
                
      }
    });
    
  }

  clickContinuar(){
    if((this.administraciones.length > 0)){
      this.router.navigate(['/resumen-tomas']);
    }
  }

  clickReturnScan(){
    this.storageService.removeItem('user_tomas')
    .then(() => {
      this.router.navigate(['/escaner']);
    })
    
  }

  clickFinalizar(){
    this.storageService.removeItem('user_tomas')
    .finally(() => {
      this.router.navigate(['/fail']);
    })
  }
    
  clickInfoLactante(pos: any){
    let showText = this.showLactante.concat(pos);
    let iconAbrir = this.iconAbrir.concat(pos);
    let iconCerrar = this.iconCerrar.concat(pos);

    if(document.getElementById(showText).style.display == 'none'){
      document.getElementById(showText).style.display = 'block';
      //ICONS
      document.getElementById(iconCerrar).style.display = 'block';
      document.getElementById(iconAbrir).style.display = 'none';
    }else{
      document.getElementById(showText).style.display = 'none';
      //ICONS
      document.getElementById(iconCerrar).style.display = 'none';
      document.getElementById(iconAbrir).style.display = 'block';
    }
  }

  onClickSalir(){
    this.loginService.presentAlertConfirm();
  }
}
