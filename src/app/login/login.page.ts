import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginUseCase } from '../use-cases/user-login.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router, 
    private userLoginUseCase: UserLoginUseCase,
    private alert: CancelAlertService // Inyecta el servicio de alertas

  ) { }

  
    email: string = '';
    password: string = '';

  ngOnInit() {
  }
  
  async onLoginButtonPressed() {
    const result = await this.userLoginUseCase.performLogin(this.email, this.password);

    if (result.success) {
      this.alert.showAlert(
        'Login exitoso',
        'Has iniciado sesión correctamente.',
        () => {
          this.router.navigate(['/tabs/home']); // Navegar a inicio cuando el login sea exitoso
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => {
          this.router.navigate(['/splash']); 
        }
      );
    }
  }


  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }
}
