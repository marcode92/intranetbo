import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { officeTable } from 'src/app/model/intranetModel';
import { UploadModuleDialogComponent } from './upload-module-dialog/upload-module-dialog.component';

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

    constructor(public dialog: MatDialog) {}

      search = new FormControl('', Validators.minLength(1));

    
    displayedColumns: string[] = ['data', 'nome', 'descrizione', 'allegato','delete'];
    dataSource = ELEMENT_DATA;
  
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(UploadModuleDialogComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }
