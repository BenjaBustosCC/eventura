import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBackButtonPressed() {
    this.router.navigate(['/tabs/home'])
  }
}
