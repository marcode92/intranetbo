import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http: HttpClient) {

  }

  saveDocu(docu: any){
    return this.http.post('http://127.0.0.1:8080/api/SaveDocu/', docu).pipe(map((response: any) => response.json()));
  }

  getDocu(){
    return this.http.get('http://127.0.0.1:8080/api/GetDocu/').pipe(map((response : any) => response.json()));
  }

  deleteDocu(id: any){
    return this.http.post('http://127.0.0.1:8080/api/DeleteDocu/', {'id' : id}).pipe(map((response: any) => response.json()));
  }

  /*
  insertOdg(url: string, data: {}){
    return this.http.post(url, data)
  }
  */

}


