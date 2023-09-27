import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-correct-presence',
  templateUrl: './correct-presence.component.html',
  styleUrls: ['./correct-presence.component.css']
})
export class CorrectPresenceComponent {

  form = new FormGroup({
    username: new FormControl('', Validators.minLength(1)),
    password: new FormControl(''),
  });
}
