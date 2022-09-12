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
  dataSource: DataTableDataSource;
  data: DataTableItem[] = [{id:1, name: 'test', type: 'test'}]
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'type', 'name'];
  constructor(private restService: ReadJSONService) {
    this.dataSource = new DataTableDataSource();
    this.dataSource.data = this.data;
    console.log(this.data.length);
    console.log(this.data);
  }

  ngOnInit(){
    const dataObservable = this.restService.getData();
      dataObservable.subscribe((dataArray: DataTableItem[]) => {
        for(var i = 0; i<dataArray.length; i++)
            this.data.push(dataArray[i]);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}