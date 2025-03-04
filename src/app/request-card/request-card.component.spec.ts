import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCardComponent } from './request-card.component';
import { RequestModel } from '../models/RequestModel';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    component.request = { id: 1, title: 'Test', userName: 'John Doe', contractNumber: '12345' } as RequestModel
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
