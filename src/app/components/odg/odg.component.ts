import { Component, OnInit} from '@angular/core';
import mongoose from "mongoose";
import { MongodbService } from 'src/app/services/mongodb.service';

export interface List {
  name : string;
}

const url = "mongodb://127.0.0.1:27017/intranet" //mongodb url
var fileBase64 : any

@Component({
  selector: 'app-odg',
  templateUrl: './odg.component.html',
  styleUrls: ['./odg.component.css']
})
export class OdgComponent implements OnInit{
  value = "";
  disabled = "true";
  name = "";
  constructor(private mongodb: MongodbService) {}

  ngOnInit(): void {
    //mongoose.connect(url).catch(error => console.log(error));
    this.mongodb.getDocu().subscribe(data => console.log(data));

  }

  onFileSelected(event: any) {
    if(event.target.files.length > 0) {
      this.value = event.target.files[0];
      this.name = event.target.value.split(/[\\.]+/)[2];
      this.disabled = "false";
      this.getBase64(this.value); // prints the base64 string
    }

  }

  /*
  insertOdg() : void {
      this.mongodb.insertOdg(
        url + '/odg',
        {name: this.name, base64:fileBase64}
      ).subscribe(data => {
          console.log(data);
      })
  }
  */

  getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      fileBase64 = reader.result;
      fileBase64 = fileBase64.split(",")[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  odg: List[] = [
    {
      name: 'Kitchen Remodel',
    },
    {
      name: 'Kitchen Remodel',
    }
  ];


}



