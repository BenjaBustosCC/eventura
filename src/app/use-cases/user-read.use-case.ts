import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/managers/StorageService'; // Importar StorageService si es necesario
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storageService: StorageService // Para almacenar datos en local si es necesario
  ) {}

  /**
   * Obtener los datos del usuario desde Firestore.
   * @returns Un observable con los datos del usuario o null si no se encuentra.
   */
  async getUserData(): Promise<any> {
    try {
      // Obtener los datos del usuario almacenado en Storage
      const user = await this.storageService.get('user');
      if (!user || !user.uid) {
        console.log('No se encontró el usuario en el almacenamiento local.');
        return null;
      }

      // Obtener el documento del usuario desde Firestore usando el uid
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();

      // Verificar si el documento existe
      if (userDoc && userDoc.exists) {
        return userDoc.data(); // Retorna los datos del usuario
      } else {
        console.log('El documento del usuario no existe');
        return null; // El documento no existe
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return null; // Si ocurre un error, retornamos null
    }
  }
}
