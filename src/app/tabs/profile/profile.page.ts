import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from 'src/app/use-cases/user-logout.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { StorageService } from 'src/managers/StorageService';
import { UserUpdateUseCase } from 'src/app/use-cases/user-update.case-use';
import { UserService } from 'src/app/use-cases/user-read.use-case';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  profileImage: string | undefined;

  constructor(
    private router: Router, 
    private logoutUseCase: UserLogoutUseCase,
    private cancelAlertService: CancelAlertService,
    private storageService: StorageService,
    private userUpdateUseCase: UserUpdateUseCase,
    private alert: CancelAlertService,
    private userService: UserService // Inyectar el servicio de usuario
  ) {}

  ngOnInit() {
    this.loadUserData();
  }
  /**
   * Cargar los datos del usuario y asignarlos a las variables del componente.
   */
  async loadUserData() {
    const userData = await this.userService.getUserData(); // Llamar al servicio para obtener datos del usuario

    if (userData) {
      this.user = userData;
      this.profileImage = userData.imagen || 'assets/default-profile.png'; // Asignar imagen si existe
    } else {
      console.log('No se pudieron cargar los datos del usuario.');
      this.profileImage = 'assets/default-profile.png'; // Imagen por defecto
    }
  }

  async ionViewDidEnter() {
    // Si quieres que se recarguen los datos cada vez que la vista entre en foco, usa este método.
    await this.loadUserData();
  }

  async changeProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
  
      // Asegúrate de que image.dataUrl es una cadena antes de usarlo
      const imageDataUrl = image.dataUrl || '';
  
      // Redimensiona y comprime la imagen a menos de 1MB
      const compressedImageDataUrl = await this.compressImage(imageDataUrl, 1024); // Tamaño objetivo: 1MB
  
      this.profileImage = compressedImageDataUrl; // Guarda la imagen comprimida como Base64
  
      // Llama al servicio para actualizar la imagen
      await this.userUpdateUseCase.updateProfilePicture(compressedImageDataUrl);
  
      console.log('Imagen de perfil actualizada en la base de datos');
    } catch (error) {
      console.error('Error al capturar o actualizar la imagen:', error);
    }
  }
  
  /**
   * Comprime y redimensiona una imagen a un tamaño objetivo.
   * @param dataUrl - La imagen en formato Base64.
   * @param maxFileSizeKB - Tamaño máximo en KB.
   * @returns La imagen comprimida en formato Base64.
   */
  private compressImage(dataUrl: string, maxFileSizeKB: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = dataUrl;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Ajusta las dimensiones del lienzo al tamaño de la imagen original
        canvas.width = img.width;
        canvas.height = img.height;
  
        // Dibuja la imagen en el lienzo
        ctx?.drawImage(img, 0, 0);
  
        let quality = 0.9; // Comienza con calidad alta
        let resultDataUrl = dataUrl;
  
        do {
          // Intenta reducir el tamaño de la imagen ajustando la calidad
          resultDataUrl = canvas.toDataURL('image/jpeg', quality);
  
          // Calcula el tamaño de la imagen en KB
          const fileSizeKB = Math.round((resultDataUrl.length * 3) / 4 / 1024);
  
          if (fileSizeKB <= maxFileSizeKB) {
            resolve(resultDataUrl);
            return;
          }
  
          quality -= 0.1; // Reduce la calidad para comprimir más
        } while (quality > 0.1); // Detente si la calidad es demasiado baja
  
        reject(new Error('No se pudo comprimir la imagen a menos de ' + maxFileSizeKB + 'KB.'));
      };
  
      img.onerror = (error) => reject(error);
    });
  }
  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        try {
          await this.storageService.logout(); // Limpia el almacenamiento local
          this.router.navigate(['/splash']); // Redirige a la pantalla de splash o login
          console.log('Sesión cerrada correctamente.');
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      },
      () => { }
    );
  }
  onUpdatePasswordPressed() {

    this.router.navigate(['/pw-update']) 
  }
  onEventManagementPressed() {
    this.router.navigate(['/event-management'])}
 async onDeleteAccountPressed() {
    // obtener el user logeado del storageservice

    this.user = await this.storageService.get('user');
    if (this.user && this.user.uid) {
      const uid = this.user.uid; 
      const result = await this.userUpdateUseCase.performDeleteAccount(uid);

      if (result.success) {
        this.alert.showAlert(
          'Eliminación Exitosa',
          'Tu cuenta ha sido eliminada correctamente.',
          () => {
            this.router.navigate(['/login']); 
          }
        );
      } else {
        this.alert.showAlert(
          'Error',
          result.message,
          () => { }
        );
      }
    } else {
      this.alert.showAlert(
        'Error',
        'No se pudo obtener la información del usuario.',
        () => { }
      );
    }
  }
}