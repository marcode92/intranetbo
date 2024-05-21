import { Component } from '@angular/core';
import { GenericOfficeComponent } from '../generic-office.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { SelectField } from 'src/app/model/intranetModel';

@Component({
  selector: 'app-upload-module-dialog',
  templateUrl: './upload-module-dialog.component.html',
  styleUrls: ['./upload-module-dialog.component.css']
})
export class UploadModuleDialogComponent {
  tipi: SelectField[] = [
    {value: 'modulo', viewValue: 'Modulo'},
    {value: 'informativa', viewValue: 'Informativa'},
  ];

  constructor(public dialogRef: MatDialogRef<GenericOfficeComponent>, private readonly vvfapiService: VvfapiService) {}
  selectedFile: Event;

  uploadForm = new FormGroup({
    nome: new FormControl('', [Validators.minLength(1),Validators.required]),
    descrizione: new FormControl(''),
    tipo: new FormControl('',Validators.required)
  });

  get nome(){
    return this.uploadForm.controls.nome.value!
  }

  get descrizione(){
    return this.uploadForm.controls.descrizione.value!
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];        
  }

  closeDialog(){
    if(this.uploadForm.valid){
      this.vvfapiService.upload(this.nome, this.descrizione, this.selectedFile)
      this.dialogRef.close();
    }
  }
}
