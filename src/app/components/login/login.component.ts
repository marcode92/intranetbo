import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { userPayload, MESSAGE } from 'src/app/model/intranetModel';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute, private router: Router) { };

  submit() {
        this.vvfapiService.loginUser(this.form.controls.username.value!, this.form.controls.password.value!).subscribe((token: any) => {
        localStorage.setItem('token', token);
        this.userPayload = JSON.parse(atob(token.split('.')[1]));

       if(this.verifyLogin()){
        return;
       }

        if (this.verifyRegistr()) {
          this.form.controls.username.disable();
          this.form.controls.password.disable();
        } else {
          this.loginDone = {
            userID: this.userPayload.userID,
            areaComp: this.userPayload.areaComp,
            logState: this.userPayload.logState,
          }
          this.vvfapiService.datiSubject.next(this.loginDone)
          this.router.navigate([''], { relativeTo: this.route });
        }      
      })
    }
  
    verifyLogin(){
      return this.userPayload && !this.userPayload.logState
    }

    verifyRegistr(){
      return (this.userPayload && this.userPayload.logState && !this.userPayload.userID && !this.userPayload.areaComp);
    }
/*fase 0 userpayload vuoto, schermata normale
  scenario 1: credenziali sbagliate userpayload ok logstate false campi vuoti
  scenario 2: credenziali corrette utente non registrato 
              userpayload ok logstate true campi vuoti
  scenario 3: credenziali corrette utente registrato
              userpayload ok logstate true campi pieni
*/
  register(){
      this.vvfapiService.loginUser(
        this.form.controls.username.value!, this.form.controls.password.value!,
        this.form.controls.userArea.value!).subscribe((res: any) => {

          this.loginDone = {
            userID: this.userPayload.userID,
            areaComp: this.userPayload.areaComp,
            logState: true,
          }
          this.vvfapiService.datiSubject.next(this.loginDone)
          this.router.navigate([''], { relativeTo: this.route });

        })
}
}
