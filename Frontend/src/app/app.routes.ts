import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { FormComponent } from './components/shared/form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/create', component: FormComponent },
  { path: 'articles/edit/:id', component: FormComponent },
];
