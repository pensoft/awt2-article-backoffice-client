import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { ReferenceDefinitionsService } from '../../services/reference-definitions.service';
import {
  ReferenceDefinitionFormComponent
} from '../../components/reference-definition-form/reference-definition-form.component';
import { ReferenceDefinitionAdapter } from '../../interfaces/reference-definition.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reference-definition-create',
  templateUrl: './reference-definition-create.component.html',
  styleUrls: ['./reference-definition-create.component.scss']
})
export class ReferenceDefinitionCreateComponent implements OnInit {

  @ViewChild(ReferenceDefinitionFormComponent, { static: true}) referenceDefinitionForm: ReferenceDefinitionFormComponent;
  constructor(private readonly toastr: ToastrService,
              private readonly translate: TranslateService,
              private readonly router: Router,
              private navigation: NavigationService,
              private readonly route: ActivatedRoute,
              private readonly referenceDefinitionsService: ReferenceDefinitionsService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.navigation.back();
  }

  create() {
    this.referenceDefinitionsService.create(new ReferenceDefinitionAdapter(this.referenceDefinitionForm.values))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CREATE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.goBack();
      })
  }
}
