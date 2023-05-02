import { ConfirmationDialogModule } from '@shared/common/confirmation-dialog/confirmation-dialog.module';
import { SelectAutocompleteComponent } from '@shared/common/select-autocomplete/select-autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const components: any[] = [
  SelectAutocompleteComponent
];

export const directives: any[] = [];

export const pipes: any[] = [];

export const imports: any[] = [
  ConfirmationDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  FormsModule,
  MatIconModule,
  MatButtonModule
];
