import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { FormBuilder } from '@angular/forms';


export interface User {
  CF : string;
  name : string;
  surname : string;
  qualifica : string;
  turno: string;
  specializzazioni: Object
}

export interface Mezzi {
  targa : string,
  tipo_mezzo : string,
  sede: string
}

@Component({
  selector: 'app-lifm',
  templateUrl: './lifm.component.html',
  styleUrls: ['./lifm.component.css']
})
export class LifmComponent {

  controllerSedi = new FormControl('');
  controllerUser = new FormControl<string | User>('');

  sediGroups: String[] = [];
  users: User[] = [];
  mezzi: Mezzi[] = [];

  filteredSedi: Observable<String[]>;
  filteredUsers: Observable<User[]>;

  selectedSede: string;
  selectedUser: string;

  specializzazioni = this._formBuilder.group({
    patente_grado1 : false,
    patente_grado2 : false,
    patente_grado3 : false,
    patente_grado4 : false
  });

  constructor(private vvfApi: VvfapiService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    //Sedi
    this.vvfApi.getSedi('Sedi?codTipoDipartimento=CMD').subscribe((sedi: any) =>  {
      this.sediGroups = [];

      sedi.forEach((sede: {descrizione: string; codice: string; }) => {
        if(sede.descrizione.split(" ")[2] != undefined){
          this.sediGroups.push(sede.codice + " - "+ sede.descrizione.split(" ")[2]);
        }
      })

      this.filteredSedi = this.controllerSedi.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSedi(value || '')),
      );

    })

  }

  getSelectedSedi(event: any) {
    if(event != undefined) this.selectedSede = event.split(" ")[0]


    if(this.selectedSede != undefined){
      //Utenti
      this.vvfApi.getUtentiBySede(this.selectedSede).subscribe((users: any) => {
        this.users = [];

        console.log(users)

        users.forEach((user: {
          turno: string; specializzazioni: Object; codiceFiscale: any; nome: any; cognome: any; qualifica: { nome: any; }; }) => {
          this.users.push({CF: user.codiceFiscale, name: user.nome, surname: user.cognome, qualifica: user.qualifica.nome, turno: user.turno, specializzazioni: user.specializzazioni})
        })

        this.filteredUsers = this.controllerUser.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filterUsers(name as string) : this.users.slice();
          }),
        )
      })

      //Mezzi
      this.vvfApi.getMezziBySede(this.selectedSede).subscribe((mezzi: any) => {
        this.mezzi = [];

        mezzi.forEach((mezzo: { targa: any; genereMezzo: { descrizione: any; }; sede: { descrizione: any; }; }) => {
          this.mezzi.push({targa: mezzo.targa, tipo_mezzo: mezzo.genereMezzo.descrizione, sede: mezzo.sede.descrizione})
        })
      })
    }



  }

  getSelectedUser(user: User) {
    this.selectedUser = user && user.name && user.surname ? user.name + " " + user.surname : '';
  }


  //filter sedi
  private _filterSedi(value: string): String[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.sediGroups.filter(sede => sede.toLowerCase().includes(filterValue))
    }
    return this.sediGroups;
  }

  //filter users
  private _filterUsers(value: string): User[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.users.filter(user => user.name.toLowerCase().includes(filterValue) || user.surname.toLowerCase().includes(filterValue))
    }
    return this.users;
  }
}



