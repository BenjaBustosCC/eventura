import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { FirebaseService } from '../services/firebase.service';

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

  firebaseService =inject(FirebaseService);

  ngOnInit() {
  }

  onLoginButtonPressed() {
    if (this.sessionManager.performLogin(this.email, this.password)) {
      const userName = this.sessionManager.getUser();  
      this.router.navigate(['/tabs'], {
        queryParams: { user: userName}
      });
    } else {
      this.email = '';
      this.password = '';
      alert('Las credenciales ingresadas son inválidas.');
    }
  }
  

  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }
}
