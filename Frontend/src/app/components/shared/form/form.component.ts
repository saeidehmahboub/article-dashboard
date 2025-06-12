import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  articleForm!: FormGroup;
  isEditMode = false;
  articleId?: number;
  articleNumber?: number;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.articleId = +id;
      }

      this.buildForm();

      if (this.isEditMode) {
        this.loadArticleData(this.articleId!);
      }
    });
  }

  buildForm(): void {
    this.articleForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      articleCategory: ['', Validators.required],
      bicycleCategory: ['', Validators.required],
      material: ['', Validators.required],
      length: [null, [Validators.required, Validators.min(0)]],
      width: [null, [Validators.required, Validators.min(0)]],
      height: [null, [Validators.required, Validators.min(0)]],
      netWeight: [null, [Validators.required, Validators.min(0)]],
    });

    if (!this.isEditMode) {
      this.articleForm.addControl(
        'articleNumber',
        new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(999999),
        ])
      );
    }
  }

  public loadArticleData(id: number): void {
    this.articleService.getArticleById(id).subscribe({
      next: (article) => {
        this.articleForm.patchValue({
          id: article.id,
          name: article.name || '',
          articleCategory: article.articleCategory || '',
          bicycleCategory: article.bicycleCategory || '',
          material: article.material || '',
          length: article.length ?? 0,
          width: article.width ?? 0,
          height: article.height ?? 0,
          netWeight: article.netWeight ?? 0,
        });

        this.articleNumber = article.articleNumber;
      },
      error: (err) => {
        console.error('Error loading article data:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;

      if (this.isEditMode) {
        this.articleService.updateArticle(this.articleId!, article).subscribe({
          next: () => {
            this.router.navigate(['/articles']);
          },
          error: (err) => {
            console.error('Error updating article:', err);
          },
        });
      } else {
        const { id, ...articleWithoutId } = article;
        this.articleService.createArticle(articleWithoutId).subscribe({
          next: () => {
            this.router.navigate(['/articles']);
          },
          error: (err) => {
            console.error('Error creating article:', err);
          },
        });
      }
    }
  }
}
