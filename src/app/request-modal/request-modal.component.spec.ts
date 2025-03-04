import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestModalComponent } from './request-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../services/requests.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('RequestModalComponent', () => {
  let component: RequestModalComponent;
  let fixture: ComponentFixture<RequestModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<RequestModalComponent>>;
  let mockRequestService: jasmine.SpyObj<RequestsService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockRequestService = jasmine.createSpyObj('RequestsService', ['addRequest', 'updateRequest']);

    await TestBed.configureTestingModule({
      imports: [RequestModalComponent, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: RequestsService, useValue: mockRequestService },
        { provide: MAT_DIALOG_DATA, useValue: { request: { id: 1, title: 'Test', userName: 'John Doe', contractNumber: '12345' } } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // New Form Validation Tests
  it('should mark title as required', () => {
    const titleControl = component.requestForm.controls['title'];
    titleControl.setValue('');
    expect(titleControl.valid).toBeFalsy();
    expect(titleControl.errors?.['required']).toBeTruthy();
  });

  it('should mark userName as required', () => {
    const userNameControl = component.requestForm.controls['userName'];
    userNameControl.setValue('');
    expect(userNameControl.valid).toBeFalsy();
    expect(userNameControl.errors?.['required']).toBeTruthy();
  });

  it('should allow contractNumber to be optional', () => {
    const contractControl = component.requestForm.controls['contractNumber'];
    contractControl.setValue('');
    expect(contractControl.valid).toBeTruthy();
  });

  // Mode Toggle Tests
  it('should initialize the form with data when in update mode', () => {
    expect(component.mode).toBe('update');
    expect(component.requestForm.value).toEqual({
      title: 'Test',
      userName: 'John Doe',
      contractNumber: '12345',
    });
  });

  it('should not submit if form is invalid', () => {
    component.requestForm.controls['title'].setValue('');
    component.submit();
    expect(mockRequestService.addRequest).not.toHaveBeenCalled();
    expect(mockRequestService.updateRequest).not.toHaveBeenCalled();
  });

  it('should call addRequest when adding a new request', () => {
    component.mode = 'add';
    component.requestForm.controls['title'].setValue('New Request');
    component.requestForm.controls['userName'].setValue('Jane Doe');
    component.requestForm.controls['contractNumber'].setValue('54321');

    component.submit();

    expect(mockRequestService.addRequest).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'New Request',
      userName: 'Jane Doe',
      contractNumber: '54321',
      type: "Demande d'autorisation de travaux",
      status: 'Statut',
    }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call updateRequest when updating an existing request', () => {
    component.mode = 'update';
    component.requestForm.controls['title'].setValue('Updated Request');

    component.submit();

    expect(mockRequestService.updateRequest).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Updated Request',
      userName: 'John Doe',
      contractNumber: '12345',
      type: "Demande d'autorisation de travaux",
      status: 'Statut',
    }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
