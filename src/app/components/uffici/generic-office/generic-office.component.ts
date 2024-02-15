import { Component } from '@angular/core';
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

    displayedColumns: string[] = ['data', 'nome', 'descrizione', 'allegato'];
    dataSource = ELEMENT_DATA;
  
}
