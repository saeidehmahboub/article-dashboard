import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService, Article, PaginationDto } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch articles with pagination', () => {
    const mockResponse: PaginationDto<Article> = {
      totalPages: 2,
      result: [
        { id: 1, articleNumber: 101, name: 'Article 1', articleCategory: 'Category A', bicycleCategory: 'Mountain', material: 'Steel', length: 100, width: 50, height: 30, netWeight: 10 },
        { id: 2, articleNumber: 102, name: 'Article 2', articleCategory: 'Category B', bicycleCategory: 'Road', material: 'Aluminum', length: 120, width: 60, height: 40, netWeight: 12 },
      ],
    };

    service.getArticles(1, 10).subscribe((articles) => {
      expect(articles.length).toBe(2);
      expect(articles[0].name).toBe('Article 1');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?pageNumber=1&pageSize=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch an article by ID', () => {
    const mockArticle: Article = { id: 1, articleNumber: 101, name: 'Article 1', articleCategory: 'Category A', bicycleCategory: 'Mountain', material: 'Steel', length: 100, width: 50, height: 30, netWeight: 10 };

    service.getArticleById(1).subscribe((article) => {
      expect(article.id).toBe(1);
      expect(article.name).toBe('Article 1');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticle);
  });

  it('should create an article', () => {
    const newArticle: Partial<Article> = { name: 'New Article', articleCategory: 'Category C' };
    const mockResponse: Article = { id: 3, articleNumber: 103, name: 'New Article', articleCategory: 'Category C', bicycleCategory: 'Hybrid', material: 'Carbon', length: 110, width: 55, height: 35, netWeight: 11 };

    service.createArticle(newArticle).subscribe((article) => {
      expect(article.id).toBe(3);
      expect(article.name).toBe('New Article');
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newArticle);
    req.flush(mockResponse);
  });

  it('should update an article', () => {
    const updatedArticle: Partial<Article> = { name: 'Updated Article' };

    service.updateArticle(1, updatedArticle).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedArticle);
    req.flush({});
  });
});
