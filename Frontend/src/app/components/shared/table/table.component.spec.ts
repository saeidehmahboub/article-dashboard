import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, TableComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create the table component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayed columns without action', () => {
    component.keys = ['name', 'category', 'material'];
    component.headers = ['Name', 'Category', 'Material'];
    component.action = undefined;

    fixture.detectChanges();

    expect(component.displayedColumns).toEqual([
      'name',
      'category',
      'material',
    ]);
  });

  it('should initialize displayed columns with action', () => {
    component.keys = ['name', 'category', 'material'];
    component.headers = ['Name', 'Category', 'Material'];
    component.action = { label: 'Edit', link: '/edit' };

    fixture.detectChanges();

    expect(component.displayedColumns).toEqual([
      'name',
      'category',
      'material',
      'action',
    ]);
  });

  it('should return correct header label for a key', () => {
    component.keys = ['name', 'category', 'material'];
    component.headers = ['Name', 'Category', 'Material'];

    fixture.detectChanges();

    expect(component.getHeaderLabel('name')).toBe('Name');
    expect(component.getHeaderLabel('category')).toBe('Category');
    expect(component.getHeaderLabel('material')).toBe('Material');
    expect(component.getHeaderLabel('unknown')).toBe('unknown');
  });
});
