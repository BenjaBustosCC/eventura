import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateUseCase } from '../use-cases/user-update.case-use';
import { StorageService } from 'src/managers/StorageService';
import { CancelAlertService } from 'src/managers/CancelAlertService';

@Component({
  selector: 'app-password-update',
  templateUrl: './pw-update.page.html',
  styleUrls: ['./pw-update.page.scss'],
})
export class PwUpdatePage implements OnInit {

  user: any;
  userPassword: string = '';
  userRePassword: string = '';
  userCurrentPassword: string = '';



  constructor(
    private router: Router,
    private userUpdateUseCase: UserUpdateUseCase,
    private storageService: StorageService,
    private alert: CancelAlertService

  ) { }

  async ngOnInit() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    } else {
      console.log('Usuario encontrado:', this.user); // verifica los datos obtenidos
      
      this.userPassword = ''; // deje los campos vacios ya que no se deberian mostrar las contraseñas
      this.userRePassword = ''; 
     
    }
  
  }
  async onPasswordUpdateButtonPressed() {
    const result = await this.userUpdateUseCase.performPasswordUpdate(this.userCurrentPassword, this.userPassword, this.userRePassword);

    if (result.success) {
      this.alert.showAlert(
        'Actualización Exitosa',
        'Tu contraseña ha sido actualizada correctamente.',
        () => {
          this.router.navigate(['/profile']); 
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => { }
      );
    }
  }
  onHomeButtonPressed() {
    this.router.navigate(['/tabs/home'])
}}