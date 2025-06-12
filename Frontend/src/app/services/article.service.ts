// src/app/services/article.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Article {
  id: number;
  articleNumber: number;
  name: string;
  articleCategory: string;
  bicycleCategory: string;
  material: string;
  length: number;
  width: number;
  height: number;
  netWeight: number;
}

export interface PaginationDto<T> {
  totalPages: number;
  result: T[];
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = 'http://localhost:5000/api/article';

  constructor(private http: HttpClient) {}

  getArticles(pageNumber = 1, pageSize = 10): Observable<Article[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<PaginationDto<Article>>(this.baseUrl, { params }).pipe(
      map((response) => response.result),
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch articles.'));
      })
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch article.'));
      })
    );
  }

  createArticle(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(this.baseUrl, article).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to create article.'));
      })
    );
  }

  updateArticle(id: number, article: Partial<Article>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, article).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to update article.'));
      })
    );
  }
}
