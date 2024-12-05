import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storageService: StorageService
  ) {}

  /**
   * Obtener los datos del usuario desde Firestore.
   * @returns Los datos del usuario o null si no se encuentran.
   */
  async getUserData(): Promise<any> {
    try {
      // Obtener los datos del usuario almacenado en Storage
      const user = await this.storageService.get<{ uid: string }>('user');
      if (!user || !user.uid) {
        console.warn('No se encontró el usuario en el almacenamiento local.');
        return null;
      }

      // Obtener el documento del usuario desde Firestore
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();

      // Verificar si el documento existe
      if (userDoc?.exists) {
        return userDoc.data(); // Retorna los datos del usuario
      } else {
        console.warn('El documento del usuario no existe en Firestore.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return null;
    }
  }
}
