import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    TableComponent,
    FormsModule,
    NgFor,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];

  articleCategories: string[] = [];
  selectedArticleCategory: string = '';

  materials: string[] = [];
  selectedMaterial: string = '';

  bicycleCategories: string[] = [];
  selectedBicycleCategories: string[] = [];

  selectedSortOption: string = '';

  sortOptions = [
    { value: 'netWeightAsc', label: 'Net Weight ↑' },
    { value: 'netWeightDesc', label: 'Net Weight ↓' },
    { value: 'categoryAsc', label: 'Article Category A-Z' },
    { value: 'categoryDesc', label: 'Article Category Z-A' },
  ];
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const pageNumber = Number(params.get('pageNumber')) || 1;
      const pageSize = Number(params.get('pageSize')) || 10;

      this.articleService.getArticles(pageNumber, pageSize).subscribe({
        next: (data) => {
          this.articles = data;
          this.filteredArticles = [...this.articles];
          this.initializeFilters();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load articles. Please try again later.');
        },
      });
    });
  }

  initializeFilters() {
    this.articleCategories = Array.from(
      new Set(this.articles.map((a) => a.articleCategory))
    );

    this.materials = Array.from(
      new Set(this.articles.map((a) => a.material))
    );

    this.bicycleCategories = Array.from(
      new Set(
        this.articles.flatMap((a) =>
          a.bicycleCategory.split(',').map((c) => c.trim())
        )
      )
    );
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter((article) => {
      const matchesArticleCategory =
        !this.selectedArticleCategory ||
        article.articleCategory === this.selectedArticleCategory;

      const matchesMaterial =
        !this.selectedMaterial || article.material === this.selectedMaterial;

      const matchesBicycleCategory =
        this.selectedBicycleCategories.length === 0 ||
        article.bicycleCategory
          .split(',')
          .map((c) => c.trim())
          .some((c) => this.selectedBicycleCategories.includes(c));

      return (
        matchesArticleCategory && matchesMaterial && matchesBicycleCategory
      );
    });

    if (this.selectedSortOption) {
      this.applySorting();
    }
  }

  updateBicycleCategoryFilter(event: { value: string[] }) {
    this.selectedBicycleCategories = event.value;
    this.filterArticles();
  }

  updateSortOption(event: { value: string }) {
    this.selectedSortOption = event.value;
    this.applySorting();
  }

  applySorting() {
    switch (this.selectedSortOption) {
      case 'netWeightAsc':
        this.filteredArticles.sort((a, b) => a.netWeight - b.netWeight);
        break;
      case 'netWeightDesc':
        this.filteredArticles.sort((a, b) => b.netWeight - a.netWeight);
        break;
      case 'categoryAsc':
        this.filteredArticles.sort((a, b) =>
          a.articleCategory.localeCompare(b.articleCategory)
        );
        break;
      case 'categoryDesc':
        this.filteredArticles.sort((a, b) =>
          b.articleCategory.localeCompare(a.articleCategory)
        );
        break;
      default:
        break;
    }
  }
}
