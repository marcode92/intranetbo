import { Component } from '@angular/core';
import { GenericOfficeComponent } from '../generic-office.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VvfapiService } from 'src/app/services/vvfapi.service';

@Component({
  selector: 'app-upload-module-dialog',
  templateUrl: './upload-module-dialog.component.html',
  styleUrls: ['./upload-module-dialog.component.css']
})
export class UploadModuleDialogComponent {
  constructor(public dialogRef: MatDialogRef<GenericOfficeComponent>, private readonly vvfapiService: VvfapiService) {}
  selectedFile: Event;

  uploadForm = new FormGroup({
    nome: new FormControl('', Validators.minLength(1)),
    descrizione: new FormControl(''),
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

  upload(){
    this.vvfapiService.upload(this.nome, this.descrizione, this.selectedFile)
  }
}
