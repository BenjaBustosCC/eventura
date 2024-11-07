import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationUseCase {

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) {}

  async performRegistration(email: string, nombre: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      // registra al usuario en Firebase Authentication
      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
 
        const uid = user.uid;
  
        const userData = {
          uid: uid,
          email: email,
          nombre: nombre,
        };

        
        await this.firestore.collection('users').doc(uid).set(userData);
      }

      
      return { success: true, message: "Usuario registrado con éxito" };

    } catch (error: any) {
      
      let errorMessage = 'Ocurrió un error al registrar el usuario';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso. Por favor, utiliza otro o inicia sesión.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'La dirección de correo electrónico no es válida.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil.';
          break;
        default:
          errorMessage += ': ' + error.message;
          break;
      }

      
      return { success: false, message: errorMessage };
    }
  }
}

