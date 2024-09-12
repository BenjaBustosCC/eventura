import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class SessionManager {

    private readonly temporaryEmail: string = 'hola@hello.com';
    private readonly temporaryUser: string = 'usuario';
    private readonly temporaryPass: string = 'pass';


    performLogin(email: string, password: string): boolean {
        if (email == this.temporaryEmail && password == this.temporaryPass) {
            return true;
        } else {
            return false;
        }
    }

    performLogout() {
        //TODO
    }
}