import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationUseCase } from '../use-cases/user-registration.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  nombre: string = '';
  password: string = '';
  profileImage: string | undefined = '';


  constructor(
    private userRegistrationUseCase: UserRegistrationUseCase,
    private router: Router,
    private alert: CancelAlertService
  ) {}

  ngOnInit() {}

  // Manejar registro
  async onRegisterButtonPressed() {
    if (!this.profileImage) {
      this.alert.showAlert(
        'Falta Imagen',
        'Por favor, sube una imagen de perfil antes de registrarte.',
        () => {}
      );
      return;
    }

    // Llama al caso de uso para manejar el registro
    const result = await this.userRegistrationUseCase.performRegistration(
      this.email,
      this.nombre,
      this.password,
      this.profileImage
    );

    if (result.success) {
      this.alert.showAlert(
        'Registro exitoso',
        'Gracias por registrarte en Eventura',
        () => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.alert.showAlert('Error', result.message, () => {
        this.clean();
      });
    }
  }

  // Limpia los campos después de un error
  clean() {
    this.email = '';
    this.password = '';
    this.nombre = '';
    this.profileImage = '';
  }

  // Captura imagen desde la cámara
  async addProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Devuelve la imagen como Base64
        source: CameraSource.Camera,
      });

      this.profileImage = image.dataUrl; // Guarda la imagen en Base64
      console.log('Imagen capturada:', this.profileImage);
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }
}
