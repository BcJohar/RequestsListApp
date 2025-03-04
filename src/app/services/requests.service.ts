import { Injectable } from '@angular/core';
import { RequestModel } from '../models/RequestModel';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  requestsStore = [
    {
      id: 1,
      userName: 'John Doe',
      type: "Demande d'autorisation de travaux",
      title: 'Projet de travaux lorem ipsum',
      contractNumber: '1534885932',
      status: 'Statut',
    },
  ] as RequestModel[];

  requests = new BehaviorSubject<RequestModel[]>(this.requestsStore);

  constructor() {}

  addRequest(request: RequestModel): void {
    this.requestsStore.push({ ...request, id: this.requestsStore.length + 1 });
    this.requests.next([...this.requestsStore]);
  }

  updateRequest(request: RequestModel): void {
    this.requestsStore.forEach((r) => {
      if (r.id === request.id) {
        r.title = request.title;
        r.userName = request.userName;
        r.contractNumber = request.contractNumber;
      }
    });
    this.requests.next([...this.requestsStore]);
  }

  deleteRequest(request: RequestModel): void {
    this.requestsStore.splice(this.requestsStore.indexOf(request), 1);
    this.requests.next([...this.requestsStore]);
  }
}
