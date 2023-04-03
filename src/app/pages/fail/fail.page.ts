import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Network, ConnectionStatus} from '@capacitor/network';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.page.html',
  styleUrls: ['./fail.page.scss'],
})
export class FailPage implements OnInit {

  isConnected: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    Network.getStatus()
    .then( (status: ConnectionStatus) => {
      this.isConnected = status.connected;
    })
  }

  volverScan(){
    this.router.navigate(['/escaner']);
  }
}
