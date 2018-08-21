import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableRendererDataSource } from './table-renderer-datasource';

@Component({
  selector: 'app-table-renderer',
  templateUrl: './table-renderer.component.html',
  styleUrls: ['./table-renderer.component.scss']
})
export class TableRendererComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableRendererDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TableRendererDataSource(this.paginator, this.sort);
  }
}
