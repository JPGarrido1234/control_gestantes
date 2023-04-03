import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBotes, ITomas } from 'src/app/interfaces/botes';
import { LactanteService } from 'src/app/services/lactante.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-escaner-bebe',
  templateUrl: './escaner-bebe.page.html',
  styleUrls: ['./escaner-bebe.page.scss'],
})
export class EscanerBebePage implements OnInit {
  botes: IBotes[] = [];
  tomas: ITomas = {
    lactante: '',
    botes: null,
    fecha: null
  };

  constructor(private lactanteService: LactanteService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
  }

  startScan(){
    this.lactanteService.serviceGetStoreTomas()
    .then(tomas => {
      if(tomas){
        const fecha = new Date();
        this.tomas = {
          lactante: this.tomas.lactante,
          botes: tomas.tomas.botes,
          fecha: fecha
        }

        this.storageService.setObject('user_tomas', {
          tomas: this.tomas
        });
        
        this.router.navigate(['/escaner-lista'])
      }
    });
  }

}
