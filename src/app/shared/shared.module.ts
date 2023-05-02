import * as shared from '@shared/index';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectAutocompleteComponent } from './common/select-autocomplete/select-autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonDirective } from './directives/back-button.directive';

@NgModule({
  declarations: [...shared.components, ...shared.directives, ...shared.pipes, BackButtonDirective],
  imports: [CommonModule, shared.imports],
  exports: [...shared.components, ...shared.directives, ...shared.pipes, ...shared.imports, BackButtonDirective],
})
export class SharedModule {}
