import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { officeTable } from 'src/app/model/intranetModel';

const ELEMENT_DATA: officeTable[] = [
  {data: 1, nome: 'Hydrogen', descrizione: 1.0079, allegato: 'H'},
  {data: 1, nome: 'Hydrogen', descrizione: 1.0079, allegato: 'H'},
];

@Component({
  selector: 'generic-office',
  templateUrl: './generic-office.component.html',
  styleUrls: ['./generic-office.component.css']
})

export class GenericOfficeComponent {
    contatti: string = '';
    referenti: string = '';

      search = new FormControl('', Validators.minLength(1));

    
    displayedColumns: string[] = ['data', 'nome', 'descrizione', 'allegato','delete'];
    dataSource = ELEMENT_DATA;
  
}
