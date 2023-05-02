import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagination } from '@core/interfaces/pagination.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-section-filters',
  templateUrl: './article-section-filters.component.html',
  styleUrls: ['./article-section-filters.component.scss']
})
export class ArticleSectionFiltersComponent implements OnInit {
  @Input() public filters: IPagination;
  @Output() filtersChanged: EventEmitter<IPagination> = new EventEmitter();
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
