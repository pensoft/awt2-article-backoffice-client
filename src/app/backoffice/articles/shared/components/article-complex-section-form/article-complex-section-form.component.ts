import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, startWith, takeUntil } from 'rxjs/operators';
import {
  ArticleSectionListAdapter,
  IArticleSection
} from '../../../article-sections/interfaces/article-sections.interface';
import { ArticleSectionsService } from '../../../article-sections/services/article-sections.service';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';
import { Observable, Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ArticleTemplateSectionSettingsComponent
} from '../article-template-section-settings/article-template-section-settings.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';
import { ArticleSectionSettingsComponent } from '../article-section-settings/article-section-settings.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-article-complex-section-form',
  templateUrl: './article-complex-section-form.component.html',
  styleUrls: ['./article-complex-section-form.component.scss']
})
export class ArticleComplexSectionFormComponent implements OnInit {
  private dialogComponents = [
    ArticleTemplateSectionSettingsComponent,
    ArticleSectionSettingsComponent
  ];
  private unsubscribe$ = new Subject<void>();
  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 9999,
    filter: [],
  });
  sections: ArticleSectionListAdapter[] = [];
  searchSection = new FormControl();
  filteredSectionOptions: Observable<ArticleSectionListAdapter[]>;
  loading = true;
  selected: ArticleSectionListAdapter[] = [];
  selectedClone: ArticleSectionListAdapter[] = [];
  sectionVersions = new Map();
  allowSameSectionMultipleTimes = true;
  @Input() selectedSections: ArticleSectionListAdapter[] = [];
  @Input() currentSection: IArticleSection;
  @Input() isTemplate = false;
  @Output() change: EventEmitter<object> = new EventEmitter();
  constructor(
    public readonly router: Router,
    private readonly articleSectionsService: ArticleSectionsService,
    private readonly dialog: MatDialog,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit(): void {
    if(this.currentSection){
      this.filters = Object.assign({},  this.filters, {filter: {id: `!${this.currentSection.id}`}})
    }

    this.getData();
  }

  initFiltering(){
    this.filteredSectionOptions = this.searchSection.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.sections.slice())),
    );
  }

  getData(){
    this.articleSectionsService.getSections(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.loading = false;
        const {data, meta: {pagination}} = result;
        this.sections = data.map(item => new ArticleSectionListAdapter({
          ...item,
          ...(
            this.isTemplate && {
              settings: {
                main_section: true,
                min_instances: 1,
                max_instances: 1
              },
            }
          ),
        }));
        this.selected = [...this.selectedSections.map(item => (new ArticleSectionListAdapter({
          ...item,
          ...(!item.version_pre_defined && { version: '' })
        })))];
        this.cloneSelected();
        this.initFiltering();
        this.setSectionsVersions(this.sections);
      });
  }

  cloneSelected(){
    this.selectedClone = JSON.parse(JSON.stringify(this.selected));
  }

  setSectionsVersions(sections){
    sections.forEach(section => {
      this.sectionVersions.set(section.id, Array.from({length: section.version}, (v, k) => k+1).reverse())
    })
  }

  setSectionVersion(currentItem, value, selected = false, index = undefined) {
    if(selected){
      const stop = !this.allowSameSectionMultipleTimes? this.selectedClone.some(item => currentItem.id === item.id && value === item.version) : false;
      if(stop){
        this.toastr.error(this.translate.instant('ARTICLE_TEMPLATE.COMPLEX_SECTION.ERROR.CAN_MOVE_SECTION'), '', {
          positionClass: 'toast-bottom-center',
        })
        this.selected = this.selectedClone;
        this.cloneSelected();
        return;
      }
    }
    //currentItem.version = value;
    this.triggerChange();
  }

  getSectionVersions = (sectionId) => this.sectionVersions.get(sectionId) || [];

  drop(event: CdkDragDrop<ArticleSectionListAdapter[]>) {
    let stop = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      stop = !this.allowSameSectionMultipleTimes? event.container.data.some(item => movedItem.id === item.id && movedItem.version === item.version) : false
      if(stop){
        this.toastr.error(this.translate.instant('ARTICLE_TEMPLATE.COMPLEX_SECTION.ERROR.CAN_MOVE_SECTION'), '', {
          positionClass: 'toast-bottom-center',
        })
      } else {
        // Clone the item that was dropped.
        const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);

        // Add the clone to the new array.
        event.container.data.splice(event.currentIndex, 0, clone);
      }
    }
    if(!stop) {
      this.triggerChange();
    }
  }

  triggerChange(){
    this.cloneSelected()
    const selectedIds = this.selected.reduce((res, section, index) => [...res,
      {
        id: section.id,
        version: section.version,
        version_id: section.version_id,
        settings: section.settings || {},
        pivot_id: section.pivot_id || {},
        index
      }], []);
    this.change.emit(selectedIds);
  }

  removeItem(item, i){
    this.selected.splice(i, 1);
    this.triggerChange();
  }

  openLink(id){
      window.open("/article/sections/update/" + id, "_blank")
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  setSettings(item: ArticleSectionListAdapter) {
    const dialogComponent = this.isTemplate? this.dialogComponents[0] : this.dialogComponents[1];

    this.dialog.open(dialogComponent,
      {
        data: {
          settings: {
            ...item.settings,
            ...(!item.settings?.label && {
              label: item.label
            })
          }
        },
        width: '650px',
        maxHeight: 'fit-content',
        autoFocus: false,
        restoreFocus: false
      }).afterClosed().subscribe(res => {
      if(res) {
        item.settings = res;
        this.triggerChange();
      }
    });
  }

  private _filter(name: string): ArticleSectionListAdapter[] {
    const filterValue = name.toLowerCase();

    return this.sections.filter(section => section.name.toLowerCase().includes(filterValue));
  }

  filterItem(value) {
    this.searchSection.setValue(value);
  }
}
