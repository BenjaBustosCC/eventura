import { Component, OnInit } from '@angular/core';
import {Geolocation, PositionOptions} from "@capacitor/geolocation";
/// <reference types="@types/google.maps" />

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  location:any = {};
  keys:string[]=[];


  constructor() {}

  ngOnInit() {
    Geolocation.requestPermissions();
  }
  getPosition(){
    var options:PositionOptions={
      enableHighAccuracy:true
    }
    Geolocation.getCurrentPosition(options).then((res)=>{
        this.location =res.coords;
        this.keys= Object.keys(this.location);
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }
}
