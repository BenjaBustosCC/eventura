import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBackButtonPressed() {
    this.router.navigate(['/tabs/home'])
  }
}
