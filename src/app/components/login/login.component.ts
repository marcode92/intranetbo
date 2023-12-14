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
  loginDone: LoginParam;
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
        this.vvfapiService.loginUser(this.form.controls.username.value!, this.form.controls.password.value!).subscribe((res: any) => {
        this.responseLogin = res.logState;

        if (!JSON.parse(this.responseLogin) && this.responseLogin!==null) {
          this.form.controls.username.disable();
          this.form.controls.password.disable();
        } else if (this.responseLogin!==null) {
          this.loginDone = {
            userID: res.userID,
            areaComp: res.areaComp,
            userLogged: true,
          }
          this.vvfapiService.datiSubject.next(this.loginDone)
          this.router.navigate([''], { relativeTo: this.route });
        }
      })
    }
  
  register(){
    if (!JSON.parse(this.responseLogin) && this.responseLogin!==null) {

      this.vvfapiService.loginUser(
        this.form.controls.username.value!, this.form.controls.password.value!,
        this.form.controls.userArea.value!).subscribe((res: any) => {

          this.loginDone = {
            userID: res.userID,
            areaComp: res.area,
            userLogged: true,
          }
          this.vvfapiService.datiSubject.next(this.loginDone)
          this.router.navigate([''], { relativeTo: this.route });

        })
  }
}
}
