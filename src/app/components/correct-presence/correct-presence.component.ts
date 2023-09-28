import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Approver } from 'src/app/model/correctPresence';

@Component({
  selector: 'app-correct-presence',
  templateUrl: './correct-presence.component.html',
  styleUrls: ['./correct-presence.component.css']
})
export class CorrectPresenceComponent {

  approvers: Approver[] = [
    {nome: 'luca', cognome: 'esposito'},
    {nome: 'marco', cognome: 'demata'},
  ];

  formRequest = new FormGroup({
    day: new FormControl(''),
    capoturno: new FormControl(''),
  });

  onSubmit(){
    console.log("submit")
  }
}
