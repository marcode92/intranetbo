import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { userPayload, MESSAGE } from 'src/app/model/intranetModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  token: ''
  userPayload : userPayload;
  loginDone: userPayload;
  error_credential: MESSAGE = MESSAGE.error_credential;
  not_registered: MESSAGE = MESSAGE.not_registered;
  login_ok: MESSAGE = MESSAGE.ok_login;
  areeAppart: string[] = ['VIGILANZA', 'FORMAZIONE']
  form = new FormGroup({
    username: new FormControl('', Validators.minLength(1)),
    password: new FormControl(''),
    userArea: new FormControl('')
  });

  constructor(private readonly vvfapiService: VvfapiService,
    private authService: AuthenticationService,
    private route: ActivatedRoute, private router: Router) { };

  submit() {
        this.vvfapiService.loginUser(this.form.controls.username.value!, this.form.controls.password.value!).subscribe((token: any) => {
          const user = JSON.parse(atob(token.split('.')[1]));
          this.userPayload = {
            userID: user && user.userID || '',
            userRole: user && user.userRole || ''
          }

       if(this.verifyLogin()){
        return;
       }

        if (this.verifyEnable()) {
          this.form.controls.username.disable();
          this.form.controls.password.disable();
        } else {
          this.authService.setToken(token);
          this.vvfapiService.triggerUpdate()
          this.router.navigate([''], { relativeTo: this.route });
        }      
      })
    }
  
    verifyLogin(){
      return this.userPayload && !this.userPayload.userID
    }

    verifyEnable(){
      return (this.userPayload && this.userPayload.userID && !this.userPayload.userRole);
    }

  register(){
      if(this.userPayload && this.userPayload.userID)
      this.vvfapiService.registerUser(
        this.userPayload.userID, this.form.controls.password.value!,
        this.form.controls.userArea.value!).subscribe((token: any) => {
          this.authService.setToken(token);         
          this.vvfapiService.triggerUpdate()
          this.router.navigate([''], { relativeTo: this.route });

        })
}
}
