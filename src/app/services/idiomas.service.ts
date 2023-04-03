import { Http, HttpOptions } from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {
  public token: string = '';
  constructor(private storageService: StorageService) { }

  async serviceGetStoreUser(): Promise<any>{
    return this.storageService.getObject('user');
  }

  serviceGetLenguages(token: string): Observable<any>{
    this.token = token;
    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/pda/idiomas'),
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(this.token)
      },
      responseType: "json"
    };
    return from(Http.get(options));
  }

  serviceGetLenguageUser(id: number): Observable<any>{
    const options: HttpOptions = {
      url: environment.API_URL_PROXY.concat('/pda/idiomas/usuario'),
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(this.token)
      },
      responseType: "json"
    };
    return from(Http.get(options));
  }
}
