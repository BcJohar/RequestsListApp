import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RequestModel } from '../models/RequestModel';
import { RequestsService } from '../services/requests.service';
import { RequestModalComponent } from '../request-modal/request-modal.component';

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatInputModule,
  ],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss',
})
export class RequestCardComponent {
  @Input({ required: true }) request!: RequestModel;

  constructor(
    public dialog: MatDialog,
    private requestsService: RequestsService
  ) {}

  openUpdateRequestDialog(): void {
    this.dialog.open(RequestModalComponent, {
      width: '500px',
      data: { request: this.request },
    });
  }

  deleteRequest(): void {
    this.requestsService.deleteRequest(this.request);
  }
}
