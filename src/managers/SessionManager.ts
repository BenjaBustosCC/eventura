import { Injectable } from '@angular/core';
import firebase from 'firebase/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: 'root',
})

export class SessionManager {
    constructor(public fireAuth: AngularFireAuth) { }

    async signOut() {
        return await this.fireAuth.signOut()
    }

    async loginWith(email: string, password: string) : Promise<any> {
        return await this.fireAuth.signInWithEmailAndPassword(email, password)
    }

    async resetPassword(email: string) {
        return await this.fireAuth.sendPasswordResetEmail(email)
    }

    async getProfile() {
        return await this.fireAuth.currentUser
    }
}

    //private readonly temporaryEmail: string = 'hola@hello.com';
    //private readonly temporaryUser: string = 'benji';
    //private readonly temporaryPass: string = 'pass';
//
//
    //performLogin(email: string, password: string): boolean {
    //    if (email == this.temporaryEmail && password == this.temporaryPass) {
    //        return true;
    //    } else {
    //        return false;
    //    }
    //}
//
    //performLogout() {
    //    //TODO
    //}
    //getUser(): string {
    //    return this.temporaryUser;
    //  }

    
