import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfirmationDialogComponent,
} from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
  ],
  entryComponents: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule { }
