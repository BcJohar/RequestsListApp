import { TestBed } from '@angular/core/testing';
import { RequestsService } from './requests.service';
import { RequestModel } from '../models/RequestModel';

describe('RequestsService', () => {
  let service: RequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with one request', () => {
    service.requests.subscribe((requests) => {
      expect(requests.length).toBe(1);
    });
  });

  it('should add a request', () => {
    const newRequest: RequestModel = {
      id: 2,
      userName: 'John Doe',
      type: "Demande d'autorisation de travaux",
      title: 'New Project',
      contractNumber: '987654321',
      status: 'Pending',
    };

    service.addRequest(newRequest);

    service.requests.subscribe((requests) => {
      expect(requests.length).toBe(2);
      expect(requests[1]).toEqual(jasmine.objectContaining(newRequest));
    });
  });

  it('should update a request', () => {
    const updatedRequest: RequestModel = {
      id: 1,
      userName: 'John Doe Updated',
      type: "Demande d'autorisation de travaux",
      title: 'Updated Project',
      contractNumber: '1534885932',
      status: 'Updated',
    };

    service.updateRequest(updatedRequest);

    service.requests.subscribe((requests) => {
      expect(requests[0].userName).toBe('John Doe Updated');
      expect(requests[0].title).toBe('Updated Project');
    });
  });

  it('should delete a request', () => {
    const requestToDelete = service.requestsStore[0];

    service.deleteRequest(requestToDelete);

    service.requests.subscribe((requests) => {
      expect(requests.length).toBe(0);
    });
  });
});
