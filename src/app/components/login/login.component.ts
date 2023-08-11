import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';

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
  user: User = {}
  loginCorrect: boolean = false;

  form = new FormGroup({
    username: new FormControl('', Validators.minLength(1)),
    password: new FormControl(''),
  });

  constructor(private readonly vvfapiService: VvfapiService){

  }
  submit(){
    this.vvfapiService.loginUser(this.form.controls.username.value!, this.form.controls.password.value!).subscribe((res:any)=>{
      console.log("response of api:",res);
      this.loginCorrect = true;
      this.user.nome = res.nome;
      this.user.cognome = res.cognome;
    })
    
    
  }
}
