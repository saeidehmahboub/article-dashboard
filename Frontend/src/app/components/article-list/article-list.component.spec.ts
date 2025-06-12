import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let mockArticleService: jasmine.SpyObj<ArticleService>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockArticleService = jasmine.createSpyObj('ArticleService', [
      'getArticles',
    ]);
    mockActivatedRoute = {
      queryParamMap: of({
        get: (key: string) => {
          if (key === 'pageNumber') return '1';
          if (key === 'pageSize') return '10';
          return null;
        },
      }),
    };

    TestBed.configureTestingModule({
      imports: [ArticleListComponent, BrowserAnimationsModule],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
  });

  it('should initialize and fetch articles', () => {
    const mockArticles = [
      {
        id: 1,
        articleNumber: 101,
        name: 'Article 1',
        articleCategory: 'Category A',
        bicycleCategory: 'Mountain',
        material: 'Steel',
        length: 100,
        width: 50,
        height: 30,
        netWeight: 10,
      },
      {
        id: 2,
        articleNumber: 102,
        name: 'Article 2',
        articleCategory: 'Category B',
        bicycleCategory: 'Road',
        material: 'Aluminum',
        length: 120,
        width: 60,
        height: 40,
        netWeight: 12,
      },
    ];

    mockArticleService.getArticles.and.returnValue(of(mockArticles)); // Return PaginationDto<Article>

    fixture.detectChanges();

    expect(component.articles.length).toBe(2);
    expect(component.filteredArticles.length).toBe(2);
    expect(component.articleCategories).toEqual(['Category A', 'Category B']);
    expect(component.materials).toEqual(['Steel', 'Aluminum']);
    expect(component.bicycleCategories).toEqual(['Mountain', 'Road']);
  });

  it('should filter articles by category', () => {
    component.articles = [
      {
        id: 1,
        articleNumber: 101,
        name: 'Article 1',
        articleCategory: 'Category A',
        bicycleCategory: 'Mountain',
        material: 'Steel',
        length: 100,
        width: 50,
        height: 30,
        netWeight: 10,
      },
      {
        id: 2,
        articleNumber: 102,
        name: 'Article 2',
        articleCategory: 'Category B',
        bicycleCategory: 'Road',
        material: 'Aluminum',
        length: 120,
        width: 60,
        height: 40,
        netWeight: 12,
      },
    ];
    component.selectedArticleCategory = 'Category A';

    component.filterArticles();

    expect(component.filteredArticles.length).toBe(1);
    expect(component.filteredArticles[0].articleCategory).toBe('Category A');
  });

  it('should sort articles by net weight ascending', () => {
    component.filteredArticles = [
      {
        id: 1,
        articleNumber: 101,
        name: 'Article 1',
        articleCategory: 'Category A',
        bicycleCategory: 'Mountain',
        material: 'Steel',
        length: 100,
        width: 50,
        height: 30,
        netWeight: 12,
      },
      {
        id: 2,
        articleNumber: 102,
        name: 'Article 2',
        articleCategory: 'Category B',
        bicycleCategory: 'Road',
        material: 'Aluminum',
        length: 120,
        width: 60,
        height: 40,
        netWeight: 10,
      },
    ];
    component.selectedSortOption = 'netWeightAsc';

    component.applySorting();

    expect(component.filteredArticles[0].netWeight).toBe(10);
    expect(component.filteredArticles[1].netWeight).toBe(12);
  });

  it('should sort articles by category descending', () => {
    component.filteredArticles = [
      {
        id: 1,
        articleNumber: 101,
        name: 'Article 1',
        articleCategory: 'Category A',
        bicycleCategory: 'Mountain',
        material: 'Steel',
        length: 100,
        width: 50,
        height: 30,
        netWeight: 10,
      },
      {
        id: 2,
        articleNumber: 102,
        name: 'Article 2',
        articleCategory: 'Category B',
        bicycleCategory: 'Road',
        material: 'Aluminum',
        length: 120,
        width: 60,
        height: 40,
        netWeight: 12,
      },
    ];
    component.selectedSortOption = 'categoryDesc';

    component.applySorting();

    expect(component.filteredArticles[0].articleCategory).toBe('Category B');
    expect(component.filteredArticles[1].articleCategory).toBe('Category A');
  });
});
