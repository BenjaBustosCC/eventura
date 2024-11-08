import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router,
              private storageService: StorageService) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);  
    }, 3000)
  }
}

//esto no funciona :(
//  async ionViewDidEnter(){
//    this.checkSession()
//  }
//
//  async checkSession(){
//    const user = await this.storageService.get('user');
//    if (user){
//      setTimeout(()=>{
//        this.router.navigate(['/home']);
//      }, 4000)
//    } else {
//      setTimeout(() =>{
//        this.router.navigate(['/login']);
//      }, 4000)
//    }
//  }
//}
  