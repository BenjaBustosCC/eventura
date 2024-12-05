import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  private async ensureInitialized(): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
  }

  public async set<T>(key: string, value: T): Promise<void> {
    await this.ensureInitialized();
    try {
      await this._storage?.set(key, value);
    } catch (error) {
      console.error(`Error al guardar la clave "${key}":`, error);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    await this.ensureInitialized();
    try {
      return (await this._storage?.get(key)) || null;
    } catch (error) {
      console.error(`Error al obtener la clave "${key}":`, error);
      return null;
    }
  }

  public async remove(key: string): Promise<void> {
    await this.ensureInitialized();
    try {
      await this._storage?.remove(key);
    } catch (error) {
      console.error(`Error al eliminar la clave "${key}":`, error);
    }
  }

  public async clear(): Promise<void> {
    await this.ensureInitialized();
    try {
      await this._storage?.clear();
    } catch (error) {
      console.error('Error al limpiar el almacenamiento:', error);
    }
  }

  /**
   * Cierra sesión limpiando todo el almacenamiento local.
   */
  public async logout(): Promise<void> {
    try {
      console.log('Cerrando sesión y limpiando almacenamiento...');
      await this.clear(); // Limpiar todo el almacenamiento
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
