import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdministracion, IBotes, ILactante, ILactanteValidate} from 'src/app/interfaces/botes';
import { LactanteService } from 'src/app/services/lactante.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-resumen-tomas',
  templateUrl: './resumen-tomas.page.html',
  styleUrls: ['./resumen-tomas.page.scss'],
})
export class ResumenTomasPage implements OnInit {
  botes: IBotes[] = [];
  array_lactantes: Array<ILactante> = [];
  administraciones: IAdministracion[] = [];
  validateLactante: ILactanteValidate[] = [];
  nombre: any = null;
  num_pulsera: string = '';
  fechaToma: string = '';
  apellidos: string = '';
  tipo: string = '';

  constructor(private router: Router,
              private storageService: StorageService,
              private loginService: LoginService,
              private lactactanteService: LactanteService) { }

  ngOnInit() {
  this.botes = [];  
  this.array_lactantes = [];
  this.validateLactante = [];
  let nombre, codigo, apellidos, numero_pulsera, recipienteACodigoBarras, recipienteATipo, recipienteBCodigoBarras, recipienteBTipo = '';
  let id, lactante_id, recipienteAVolumen, recipienteBVolumen = null;
  let horaToma = null;

  this.lactactanteService.serviceGetStoreTomas()
      .then(tomas => {
        if(tomas.tomas){
          this.botes = tomas.tomas.botes;
          this.storageService.getObject('tomas_store')
          .then(res => {
            if(res){
              if(Array.isArray(res)){
                res.forEach(element => {
                  if(element.administraciones.length > 0){
                    element.administraciones.forEach(toma => {
                      this.administraciones.push({
                        "id": toma.id,
                        "horaToma": toma.horaToma != null ? toma.horaToma : new Date,
                        "recipienteACodigoBarras": toma.recipienteACodigoBarras,
                        "recipienteATipo": toma.recipienteATipo != '' ? toma.recipienteATipo : '',
                        "recipienteAVolumen": toma.recipienteAVolumen != '' ? toma.recipienteAVolumen : '',
                        "recipienteBCodigoBarras": toma.recipienteBCodigoBarras,
                        "recipienteBTipo": toma.recipienteBTipo != '' ? toma.recipienteBTipo : '',
                        "recipienteBVolumen": toma.recipienteBVolumen != '' ? toma.recipienteBVolumen : '',
                        "errorBote1": toma.errorBote1,
                        "errorBote2": toma.errorBote2
                      });

                      if(this.botes.length == 1){
                        if(this.botes[0].codigo == toma.recipienteACodigoBarras){
                          this.tipo = "tipoA";
                          console.log('tipoA');
                        }
                        if(this.botes[0].codigo == toma.recipienteBCodigoBarras){
                          this.tipo = "tipoB";
                          console.log('tipoB');
                        }
                      }
                    });
                    
                    
                    
                  }

                  

                  this.array_lactantes.push({
                    "id": element.id,
                    "codigo": element.codigo,
                    "nombre":element.nombre, 
                    "numero_pulsera": element.numero_pulsera, 
                    "apellidos": element.apellidos,
                    "administraciones": this.administraciones
                  });

                  if(this.array_lactantes.length > 0){
                    this.array_lactantes.forEach(loop => {
                      id = loop.id;
                      codigo = loop.codigo;
                      nombre = loop.nombre;
                      apellidos = loop.apellidos;
                      numero_pulsera = loop.numero_pulsera;
                      
                      if(loop.administraciones.length > 0){
                        loop.administraciones.forEach(bote => {

                          this.validateLactante.push({
                              "id":id,
                              "codigo": codigo,
                              "nombre": nombre,
                              "apellidos": apellidos,
                              "numero_pulsera": numero_pulsera,
                              "administracion": {
                                "id": bote.id,
                                "horaToma": bote.horaToma,
                                "preparada": true,
                                "administrada": true,
                                "codigoLactante": codigo != undefined ? codigo : '',
                                "pulseraLactante": numero_pulsera,
                                "recipienteACodigoBarras": bote.recipienteACodigoBarras != undefined ? bote.recipienteACodigoBarras : '',
                                "recipienteALeche": bote.recipienteAleche != undefined ? bote.recipienteAleche : '',
                                "recipienteATipoLeche": 0,
                                "recipienteATipo": bote.recipienteATipo != undefined ? bote.recipienteATipo : '',
                                "recipienteACodigo": bote.recipienteACodigo != undefined ? bote.recipienteACodigo : '',
                                "recipienteAVolumen": bote.recipienteAVolumen != undefined ? bote.recipienteAVolumen : 0,
                                "recipienteBCodigoBarras": bote.recipienteBCodigoBarras != undefined ? bote.recipienteBCodigoBarras : '',
                                "recipienteBLeche": bote.recipienteBleche != undefined ? bote.recipienteBleche : '',
                                "recipienteBTipoLeche": 0,
                                "recipienteBTipo": bote.recipienteBTipo != undefined ? bote.recipienteBTipo : '',
                                "recipienteBCodigo": bote.recipienteBCodigo != undefined ? bote.recipienteBCodigo : '',
                                "recipienteBVolumen": bote.recipienteBVolumen != undefined ? bote.recipienteBVolumen : 0
                              }
                          });

                        });
                      }
                    })
                  }

                  if(this.validateLactante.length > 0){
                    this.storageService.setObject('lactante_validate', this.validateLactante);
                  }
                  
                });
              }
            }
          });
        }
      });
  }

  clickContinuar(){
    this.router.navigate(['/notif-tomas'])
  }

  onClickSalir(){
    this.loginService.presentAlertConfirm();
  }
}
