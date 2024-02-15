import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { userPayload, Personale } from '../model/intranetModel';

const url = "/api"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Consentire l'accesso da qualsiasi dominio
    'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VvfapiService {

  datiSubject = new Subject<void>()
  logObs$ = this.datiSubject.asObservable()
  constructor(private http: HttpClient) { }

  getUtentiByName(searchKey: string):Observable<Personale[]> {
    
    return this.http.get<Personale[]>(`${url}/Personale?searchKey=${searchKey}`, httpOptions)
  }

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

  loginUser(userID: string, password: string) {
    return this.http.request('POST',`http://localhost:3000/login`, {body:{userID, password}} )
  }
  
  registerUser(userID: string, password: string, userRole?: string) {
    return this.http.request('POST',`http://localhost:3000/register`, {body:{userID, password, userRole}} )
  }

  sendemail() {
    return this.http.request('POST',`http://localhost:3000/sendemail`)
  }

  triggerUpdate(){
    setTimeout(() => {
    this.datiSubject.next();
    })
  }
}
