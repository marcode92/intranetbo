import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { Approver, Personale } from 'src/app/model/correctPresence';
import { VvfapiService } from 'src/app/services/vvfapi.service';

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
    vigile: new FormControl('')
  });

  filteredOptions: Observable<any>;
  
  constructor(private readonly vvfapiService: VvfapiService){
  
  }

  ngOnInit() {
    this.filter("demata")
   /*   this.filteredOptions = this.formRequest.get("vigile")!.valueChanges
     .pipe(
        distinctUntilChanged(),
        switchMap(val => {
          return val && val.length >=3? this.filter(val || '') : ''
     }) 
      ); */    
  }
  
   
  filter(val: string)/* : Observable<any> */ {

    /* return */ this.vvfapiService.getUtentiByName("demata").subscribe(x => console.log(x))
     /* .pipe(
       map(response => response.map(x => x.codiceFiscale))
     ) */
   }  

  onSubmit(){
    this.vvfapiService.sendemail().subscribe(x=> console.log(x))
    console.log("submit")
  }
}
