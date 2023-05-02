import { Injectable } from '@angular/core';
import { ArticleSectionsRepository } from '../repositories/article-sections.repository';
import {
  ArticleSectionOutputAdapter,
  IArticleSection,
  IArticleSectionOutputResult
} from '../interfaces/article-sections.interface';
import { Observable } from 'rxjs';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleSectionsService {

  constructor(private readonly articleSectionsRepository: ArticleSectionsRepository) { }

  getSections(filters: IPagination): Observable<PaginationInputData<IArticleSection>>{
    return this.articleSectionsRepository.getSections(filters);
  }

  getSection(id: number, options = {}): Observable<IArticleSectionOutputResult> {
    return this.articleSectionsRepository.getSection(id, options);
  }

  exportSection(id: number, options = {}): Observable<IArticleSectionOutputResult> {
    return this.articleSectionsRepository.exportSection(id, options);
  }

  createSection(section: ArticleSectionOutputAdapter): Observable<IArticleSectionOutputResult>{
    return this.articleSectionsRepository.createSection(section)
  }

  updateSections(id: number, section: ArticleSectionOutputAdapter): Observable<IArticleSectionOutputResult>{
    return this.articleSectionsRepository.updateSection(id, section);
  }

  deleteSection(id: number): Observable<any> {
    return this.articleSectionsRepository.deleteSection(id);
  }

  importSections(data): Observable<any> {
    return this.articleSectionsRepository.importSections(data);
  }

  uploadMedia(data): Observable<any> {
    return this.articleSectionsRepository.uploadMedia(data);
  }
}
