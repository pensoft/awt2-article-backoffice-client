import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArticleSectionTypes } from '../../enums/article-section-types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPagination } from '@core/interfaces/pagination.interface';

@Component({
  selector: 'app-article-section-filters-dd',
  templateUrl: './article-section-filters-dd.component.html',
  styleUrls: ['./article-section-filters-dd.component.scss']
})
export class ArticleSectionFiltersDdComponent implements OnInit, OnChanges {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  public articleSectionTypes = ArticleSectionTypes
  public articleSectionTypesKey = [];
  formGroup: FormGroup = this.fb.group({
    type: this.fb.control(''),
    name: this.fb.control('')
  });
  _filters: IPagination;
  @Input() public filters: IPagination;
  @Output() filtersChanged: EventEmitter<IPagination> = new EventEmitter();

  constructor(private readonly fb: FormBuilder,) {
    this.articleSectionTypesKey = Object.keys(ArticleSectionTypes).filter(f => !isNaN(Number(f)));
  }

  ngOnInit(): void {
    this._filters = this.filters;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters && JSON.stringify(changes.filters.currentValue) !== JSON.stringify(this._filters)) {
      this._filters = changes.filters.currentValue;
      Object.keys(this._filters.filter || {}).map(key => {
        if (this.formGroup.contains(key)) {
          this.formGroup.get(key).patchValue(this._filters.filter[key])
        }
      })
    }
  }

  applyFilters() {
    const values = this.formGroup.getRawValue();
    this._filters.filter = Object.keys(values).reduce((acc, key) => ({...acc, ...(values[key] !== "" ? {[key]: values[key]} : {})}), {})
    this._filters.page = 1;
    this.filtersChanged.emit(this._filters);
  }

  resetFilters(){
    this.formGroup.reset({
      type: '',
      name: ''
    });
    this.applyFilters();
  }

}
