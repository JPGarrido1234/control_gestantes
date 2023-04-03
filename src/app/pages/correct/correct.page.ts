import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correct',
  templateUrl: './correct.page.html',
  styleUrls: ['./correct.page.scss'],
})
export class CorrectPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/resumen-tomas']);
    }, 2000);
  }
}
