import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { LoginParam, MESSAGE } from 'src/app/model/intranetModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  responseLogin: string = ''
  loginDone : LoginParam;
  error_credential : MESSAGE = MESSAGE.error_credential;
  not_registered : MESSAGE = MESSAGE.not_registered;
  login_ok : MESSAGE = MESSAGE.ok_login;
  areeAppart: string[] = ['VIGILANZA','FORMAZIONE']
  form = new FormGroup({
    username: new FormControl('', Validators.minLength(1)),
    password: new FormControl(''),
  });

  constructor(private readonly vvfapiService: VvfapiService,
    private route: ActivatedRoute, private router: Router) {};
    

  submit(){
   // this.vvfapiService.loginUser(this.form.controls.username.value!, this.form.controls.password.value!).subscribe((res:any)=>{
      this.responseLogin = this.login_ok.toString(); 
      if(this.responseLogin === this.not_registered.toString()){
        this.form.controls.username.disable();
        this.form.controls.password.disable();
      } else if(this.responseLogin === this.login_ok.toString()) {
        this.vvfapiService.loginState = true;
        this.loginDone = {
          idUser:/*res.idUser*/'marco demata',
          areaApp:/*res.areaApp*/'VIG',
          userLogged:true,                    
        }          
        this.vvfapiService.datiSubject.next(this.loginDone)
      this.router.navigate(['',/* res.idUser */], { relativeTo: this.route });
      //}
      
      /* 
      this.user.nome = res.nome;
      this.user.cognome = res.cognome; */
    //})
   
  }
}
}
