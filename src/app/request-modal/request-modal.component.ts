import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RequestsService } from '../services/requests.service';
import { RequestModel } from '../models/RequestModel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-request-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.scss',
})
export class RequestModalComponent {
  mode: 'add' | 'update' = 'add';
  request = {
    id: 0,
    title: '',
    contractNumber: '',
    userName: '',
  } as RequestModel;

  requestForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestsService,
    private dialogRef: MatDialogRef<RequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { request: RequestModel }
  ) {
    if (data && data.request) {
      this.request = { ...data.request };
      this.mode = 'update';
    }
  }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      title: [this.request.title, Validators.required],
      userName: [this.request.userName, Validators.required],
      contractNumber: [this.request.contractNumber],
    });
  }

  submit(): void {
    if (!this.requestForm.valid)
      return;

    this.request.title = this.requestForm.value.title;
    this.request.userName = this.requestForm.value.userName;
    this.request.contractNumber = this.requestForm.value.contractNumber;
    this.request.type = "Demande d'autorisation de travaux";
    this.request.status = 'Statut';

    switch (this.mode) {
      case 'add':
        this.requestService.addRequest({
          ...this.request,
        });
        break;
      case 'update':
        this.requestService.updateRequest({
          ...this.request,
        });
        break;
    }

    this.dialogRef.close();
  }
}
