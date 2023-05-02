import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  ArticleSectionListAdapter,
  IArticleSection,
  ISectionCompatibility,
  ISectionCompatibilityUnit
} from '../../interfaces/article-sections.interface';
import { ArticleSectionsService } from '../../services/article-sections.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';
import { takeUntil } from 'rxjs/operators';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { capitalizeFirstLetter } from '@shared/utils';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-article-section-compatibility',
  templateUrl: './article-section-compatibility.component.html',
  styleUrls: ['./article-section-compatibility.component.scss']
})
export class ArticleSectionCompatibilityComponent implements OnInit, OnChanges {
  private unsubscribe$ = new Subject<void>();
  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 9999,
    filter: [],
  });
  loading = true;
  sections: ArticleSectionListAdapter[] = [];
  selectedAllow: ArticleSectionListAdapter[] = [];
  selectedDeny: ArticleSectionListAdapter[] = [];
  denyAll = new FormControl(false);
  denyAllValue = false;
  allowCompatibility = new FormControl(true);
  allowCompatibilityValue = true;
  @Input() currentlySelectedSections: number[] = [];
  @Input() currentSection: IArticleSection;
  @Output() change: EventEmitter<object> = new EventEmitter();
  @Output() changeAllowCompatibility: EventEmitter<object> = new EventEmitter();

  constructor(
    private readonly articleSectionsService: ArticleSectionsService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.currentSection){
      this.allowCompatibilityValue = this.currentSection.allow_compatibility;
      this.allowCompatibility.setValue(this.allowCompatibilityValue, {emitEvent: false})

      //this.filters = Object.assign({},  this.filters, {filter: [ {id: `!${this.currentSection.id}`} ]})
    }
    this.denyAll.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.denyAllValue = data;
      this.triggerChange();
    });

    this.allowCompatibility.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.allowCompatibilityValue = data;
      this.changeAllowCompatibility.emit(data);
    });

    this.getData(() => {
      if(this.currentSection){
        const allowValues = this.currentSection.compatibility?.allow?.values || [];
        allowValues.map(id => this.transferSectionByIdToArea(id, 'allow'))
        const denyValues = this.currentSection.compatibility?.deny?.values || [];
        denyValues.map(id => this.transferSectionByIdToArea(id, 'deny'))

        this.denyAll.setValue(this.currentSection.compatibility?.deny?.all || false, {emitEvent: true})
      }


    });
  }

  get denyAllStatus(){
    return !this.denyAllValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(
      changes.currentlySelectedSections
      && !changes.currentlySelectedSections.isFirstChange()
      && JSON.stringify(changes.currentlySelectedSections.currentValue) !== JSON.stringify(changes.currentlySelectedSections.previousValue)
      && !(changes.currentlySelectedSections.currentValue instanceof Event)
      && changes.currentlySelectedSections.currentValue !== undefined
    ){
      const ids= changes.currentlySelectedSections.currentValue;
      ids.forEach(id => {
        this.transferSectionByIdToArea(id)
      })
    }
  }

  transferSectionByIdToArea(id, area = 'allow', from = `sections`, to = null){
    to = to || `selected${capitalizeFirstLetter(area)}`;
    const previousIndex = this.sections.findIndex(section => section.id === id);
    if(previousIndex > -1) {
      transferArrayItem(
        this[from],
        this[to],
        previousIndex,
        this[to].length
      );

      this.triggerChange();
    }
  }

  getData(callback = () => {}){
    this.articleSectionsService.getSections(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.loading = false;
        const { data, meta: { pagination } } = result;
        this.sections = data.map(item => new ArticleSectionListAdapter(item));
        callback()
      });
  }

  drop(event: CdkDragDrop<ArticleSectionListAdapter[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.triggerChange();
  }

  removeAllowItem(item, i){
    this.selectedAllow.splice(i, 1);
    this.triggerChange();
  }

  removeDenyItem(item, i){
    this.selectedDeny.splice(i, 1);
    this.triggerChange();
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  denyPredicate(deny){
    return function(drag: CdkDrag, drop: CdkDropList) {
      return deny;
    };
  }

  triggerChange(){
    const selectedAllow = this.selectedAllow.reduce((res, section) => [...res, section.id], []);
    const selectedDeny = this.selectedDeny.reduce((res, section) => [...res, section.id], []);
    this.change.emit({
      allow: {
        all: false,
        values: selectedAllow
      } as ISectionCompatibilityUnit,
      deny: {
        all: this.denyAllValue,
        values: selectedDeny
      } as ISectionCompatibilityUnit
    } as ISectionCompatibility);
  }

  isDisabled(item){
    return (this.currentlySelectedSections || []).indexOf(item.id) > - 1;
  }
}
