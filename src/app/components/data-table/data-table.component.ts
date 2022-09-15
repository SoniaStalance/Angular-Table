import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { ReadJSONService } from '../../services/read-json.service';
import { DataTableItem } from 'src/app/models/DataTableItem.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource!: DataTableDataSource;
  data: DataTableItem[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'type', 'name'];
  
  constructor(private restService: ReadJSONService) {  }
  
  ngOnInit(): void {
    const dataObservable = this.restService.getData();
    dataObservable.subscribe((dataArray: DataTableItem[]) => {
      for(var i = 0; i<dataArray.length; i++)
      { 
        this.data.push(dataArray[i]);
      }
      this.dataSource = new DataTableDataSource(this.data, this.paginator, this.sort);
    });
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
  }
}