import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockArticleService: jasmine.SpyObj<ArticleService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockArticleService = jasmine.createSpyObj('ArticleService', [
      'getArticleById',
      'updateArticle',
      'createArticle',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      params: of({ id: '1' }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponent, NoopAnimationsModule],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in edit mode and load article data', () => {
    const mockArticle = {
      id: 1,
      articleNumber: 101,
      name: 'Test Article',
      articleCategory: 'Category A',
      bicycleCategory: 'Mountain',
      material: 'Steel',
      length: 100,
      width: 50,
      height: 30,
      netWeight: 10,
    };

    mockArticleService.getArticleById.and.returnValue(of(mockArticle));

    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(component.articleId).toBe(1);
    expect(component.articleForm.value.name).toBe('Test Article');
    expect(component.articleForm.value.articleCategory).toBe('Category A');
  });

  it('should submit the form in edit mode and update the article', () => {
    component.isEditMode = true;
    component.articleId = 1;
    fixture.detectChanges();
    component.articleForm.setValue({
      id: 1,
      name: 'Updated Article',
      articleCategory: 'Category B',
      bicycleCategory: 'Road',
      material: 'Aluminum',
      length: 120,
      width: 60,
      height: 40,
      netWeight: 12,
    });

    mockArticleService.updateArticle.and.returnValue(of(void 0));

    component.onSubmit();

    expect(mockArticleService.updateArticle).toHaveBeenCalledWith(
      1,
      component.articleForm.value
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/articles']);
  });

  it('should submit the form in create mode and create a new article', () => {
    mockActivatedRoute.params = of({});
    component.isEditMode = false;
    fixture.detectChanges();
    mockArticleService.createArticle.and.returnValue(
      of({
        id: 3,
        articleNumber: 102,
        name: 'New Article',
        articleCategory: 'Category C',
        bicycleCategory: 'Hybrid',
        material: 'Carbon',
        length: 110,
        width: 55,
        height: 35,
        netWeight: 11,
      })
    );

    component.articleForm.setValue({
      id: null,
      articleNumber: 102,
      name: 'New Article',
      articleCategory: 'Category C',
      bicycleCategory: 'Hybrid',
      material: 'Carbon',
      length: 110,
      width: 55,
      height: 35,
      netWeight: 11,
    });

    component.onSubmit();

    expect(mockArticleService.createArticle).toHaveBeenCalledWith({
      articleNumber: 102,
      name: 'New Article',
      articleCategory: 'Category C',
      bicycleCategory: 'Hybrid',
      material: 'Carbon',
      length: 110,
      width: 55,
      height: 35,
      netWeight: 11,
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/articles']);
  });
});
