import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/managers/StorageService';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class UserUpdateUseCase {

  constructor(
    private firestore: AngularFirestore,
    private storageService: StorageService,
    private fireAuth: AngularFireAuth
  ) { }

  async performPasswordUpdate(currentPassword: string, newPassword: string, newRePassword: string): Promise<{ success: boolean; message: string }> {
    try {
        // verificar si hay un usuario autenticado
        const user = await this.fireAuth.currentUser;
        if (!user) {
            return { success: false, message: 'No hay un usuario autenticado' };
        }

        // re autenticacion del usuario (este es un paso obligatorio de fire base authentication para no tener que deslogear al usuario)
        const credential = EmailAuthProvider.credential(user.email as string, currentPassword);
        await user.reauthenticateWithCredential(credential);

        // verificar que las contraseñas nuevas coincidan
        if (newPassword !== newRePassword) {
            return { success: false, message: 'Las contraseñas no coinciden' };
        }

        // si todo lo anterior fue exitoso se actualiza la contraseña
        await user.updatePassword(newPassword);
        
        return { success: true, message: 'Contraseña actualizada con éxito' };
    } catch (error: any) {
        return { success: false, message: `Error al actualizar la contraseña: ${error.message}` };
    }
    }
    async performDeleteAccount(uid: string): Promise<{ success: boolean; message: string }> {
      try {
          // Eliminar el documento del usuario en Firestore
          await this.firestore.collection('users').doc(uid).delete();
  
          // Obtener el usuario autenticado
          const user = await this.fireAuth.currentUser;
          if (user) {
              // Eliminar al usuario de Firebase Authentication
              await user.delete();
          } else {
              return { success: false, message: 'No se encontró el usuario autenticado para eliminar' };
          }
  
          // Cerrar sesión de Firebase
          await this.fireAuth.signOut();
  
          // Limpiar todos los datos de Ionic Storage
          await this.storageService.clear();
  
          return { success: true, message: 'Usuario eliminado con éxito' };
      } catch (error: any) {
          return { success: false, message: `Error al eliminar el usuario: ${error.message}` };
      }
  }}