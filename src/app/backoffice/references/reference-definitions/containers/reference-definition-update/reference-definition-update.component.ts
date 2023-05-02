import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenceDefinitionAdapter } from '../../interfaces/reference-definition.interface';
import {
  ReferenceDefinitionFormComponent
} from '../../components/reference-definition-form/reference-definition-form.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { ReferenceDefinitionsService } from '../../services/reference-definitions.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reference-definition-update',
  templateUrl: './reference-definition-update.component.html',
  styleUrls: ['./reference-definition-update.component.scss']
})
export class ReferenceDefinitionUpdateComponent implements OnInit {
  item: ReferenceDefinitionAdapter;
  @ViewChild(ReferenceDefinitionFormComponent, { static: true}) referenceDefinitionForm: ReferenceDefinitionFormComponent;
  constructor(private readonly toastr: ToastrService,
              private readonly translate: TranslateService,
              private readonly router: Router,
              private navigation: NavigationService,
              private readonly route: ActivatedRoute,
              private readonly referenceDefinitionsService: ReferenceDefinitionsService) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.item = data.item;
    });
  }

  update() {
    this.referenceDefinitionsService.update(this.item.id, new ReferenceDefinitionAdapter({...this.referenceDefinitionForm.values}))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CHANGE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.goBack();
      })
  }

  goBack(): void {
    this.navigation.back();
  }
}
