import { Injectable } from '@angular/core';
import { Http, HttpOptions } from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILactanteValidate, ITomas } from '../interfaces/botes';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LactanteService {

  constructor(private storageService: StorageService) { }

  async serviceGetStoreUser(): Promise<any>{
    return this.storageService.getObject('user');
  }

  async serviceGetStoreTomas(): Promise<any>{
    return this.storageService.getObject('user_tomas');
  }

  serviceGetLactanteOnline(token: string, codigo: string): Observable<any>{
    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/pda/tomas/toma/').concat(codigo),
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(token)
      },
      responseType: "json"
    };
    return from(Http.get(options));
  }

  serviceGetPulseraOnline(token: string, pulsera: string): Observable<any>{
    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/pda/tomas/lactante/').concat(pulsera),
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(token)
      },
      responseType: "json"
    };
    return from(Http.get(options));
  }

  servicePostLactanteValidate(token: string, lactante: ILactanteValidate): Observable<any>{
    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/pda/tomas/validar'),
      method: 'POST',
      data:lactante,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(token)
      },
      responseType: "json"
    };
    return from(Http.post(options));
  }
}
