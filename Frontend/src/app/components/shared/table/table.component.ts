import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];
  @Input() keys: string[] = [];
  @Input() action?: { label: string; link: string };

  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = [...this.keys];
    if (this.action) {
      this.displayedColumns.push('action');
    }
  }

  getHeaderLabel(key: string): string {
    const index = this.keys.indexOf(key);
    return index !== -1 ? this.headers[index] : key;
  }
}
