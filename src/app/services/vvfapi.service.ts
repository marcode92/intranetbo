import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

var url = "https://wauc-test.dipvvf.it/api/"

@Injectable({
  providedIn: 'root'
})
export class VvfapiService {

  constructor(private http: HttpClient) { }

  getUtentiBySede(codice: string) {
    console.log(url + `Personale?codiciSede=` + codice);
    return this.http.get(url + `Personale?codiciSede=` + codice)
  }

  getMezziBySede(codice: string) {
    console.log(url + `Mezzi?codiciSede=` + codice);
    return this.http.get(url + `Mezzi?codiciSede=` + codice)
  }

  getSedi(requestUrl: string) {
    console.log(url + requestUrl);
    return this.http.get(url + requestUrl)
  }

  loginUser(username: string, password: string) {
    return this.http.request('POST',`http://localhost:3000/login`, {body:{username, password}} )
  }
  
}
