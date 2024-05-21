import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { officeTable } from 'src/app/model/intranetModel';
import { SelectField } from 'src/app/model/intranetModel';
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

export class GenericOfficeComponent implements OnInit {
    contatti: string = '';
    referenti: string = '';
    filterForm = new FormGroup({
      search : new FormControl({value:'',disabled:true}, Validators.minLength(1),),
      type : new FormControl(''),      
    })
    displayedColumns: string[] = ['data', 'nome', 'descrizione', 'allegato','delete'];
    dataSource = ELEMENT_DATA;

    fields: SelectField[] = [
      {value: 'nome', viewValue: 'Nome'},
      {value: 'desc', viewValue: 'Desc'},
      {value: 'data', viewValue: 'Data'},
    ];
    
    get type(){
      return this.filterForm.controls.type.value!
    }

    get search(){
      return this.filterForm.controls.search.value!
    }

    constructor(public dialog: MatDialog) {}
    
    ngOnInit() {
      if(!this.type){
        this.filterForm.controls.search.disable();
      }
    }  

    filterModule(){
      this.dataSource
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(UploadModuleDialogComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

    selectType(){
      const campoData = this.fields.find(x => x.value === 'data')
      if(this.type !== campoData!.value ){
        this.filterForm.controls.search.enable();
      } else if(this.type === campoData!.value){
        this.filterForm.
      }
    }
  }
