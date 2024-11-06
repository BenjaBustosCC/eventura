import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { StorageService } from 'src/managers/StorageService';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private storageService: StorageService,
  private router: Router) {}

  ngOnInit() {}
  async onLoginButtonPressed(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Autenticar el usuario utilizando Firebase Authentication
      const userCredential = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const uid = user.uid;

        // Obtener la información del usuario desde Realtime Database
        const userRef = this.db.object(`/users/${uid}`);
        const userDataSnapshot = await userRef.query.once('value');
        const userData = userDataSnapshot.val();

        if (userData) {
          // Manejo de campos vacíos (nombre de usuario y foto de perfil)
          const displayName = userData.displayName ?? ''; // Si es nulo, guarda un string vacío
          const photoURL = userData.photoURL || ''; // Si es nulo, guarda un string vacío

          // Guardar los datos obtenidos de Realtime Database en Ionic Storage
          await this.storageService.set('user', {
            uid: uid,
            email: userData.email || '', // Si email es nulo, guarda string vacío
            displayName: displayName,
            photoURL: photoURL,
          });

          return { success: true, message: 'Login successful' };
        } else {
          return {
            success: false,
            message: 'User not found in Realtime Database',
          };
        }
      } else {
        return {
          success: false,
          message: 'Authentication failed, user not found',
        };
      }
    } catch (error: any) {
      let errorMessage = 'Error during login';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please check your credentials.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        default:
          errorMessage += ': ' + error.message;
          break;
      }

      return { success: false, message: errorMessage };
    }
  }

  // onLoginButtonPressed() {
  //   if (this.sessionManager.performLogin(this.email, this.password)) {
  //     const userName = this.sessionManager.getUser();
  //     this.router.navigate(['/tabs'], {
  //       queryParams: { user: userName}
  //     });
  //   } else {
  //     this.email = '';
  //     this.password = '';
  //     alert('Las credenciales ingresadas son inválidas.');
  //   }
  // }

  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }
}
