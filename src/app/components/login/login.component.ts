import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { MESSAGE } from 'src/app/model/correctPresence';

export interface User {
  nome?: string,
  cognome?:string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  responseLogin: string = ''
  user: User = {}
  error_credential : MESSAGE = MESSAGE.error_credential;
  not_registered : MESSAGE = MESSAGE.not_registered;
  areeAppart: string[] = ['VIGILANZA','FORMAZIONE']
  form = new FormGroup({
    username: new FormControl('', Validators.minLength(1)),
    password: new FormControl(''),
  });

  constructor(private readonly vvfapiService: VvfapiService){
  }

  submit(){
    this.vvfapiService.loginUser(this.form.controls.username.value!, this.form.controls.password.value!).subscribe((res:any)=>{
      this.responseLogin = res; 
      if(this.responseLogin === this.not_registered.toString()){
        this.form.controls.username.disable();
        this.form.controls.password.disable();
      }
      this.user.nome = res.nome;
      this.user.cognome = res.cognome;
    })
    
    
  }
}
