import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private sessionManager: SessionManager) { }

    email: string = '';
    user: string = '';
    password: string = '';

  ngOnInit() {
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }
}
