import { Component, Injectable, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage implements OnInit{
  constructor(private storageService: StorageService,
              private router: Router){

  }
  ngOnInit() {
    this.storageService.getObject('user')
    .then(res => {
      if(res){
        //console.log(res);
      }
    })
    .catch(err => {
      if(err){
        console.log(err);
      }
    })
  }

  onClickEscanear(){
    this.storageService.removeItem('user_tomas')
    .then(() => {
      this.router.navigate(['/escaner'])
    });
  }

  onClickConfiguration(){
    this.router.navigate(['/ajustes']);
  }
  
}
