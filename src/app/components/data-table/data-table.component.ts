import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { ReadJSONService } from '../../services/read-json.service';
import { Data } from 'src/app/models/Data';

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
  data: Data[] = [{id:1, name: 'test', type: 'test'}]
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'type', 'name'];
  constructor(private restService: ReadJSONService) {
    console.log(this.data);
    this.dataSource = new DataTableDataSource();
    this.dataSource.data = this.data;
  }

  ngOnInit(): void{
    const dataObservable = this.restService.getData();
      dataObservable.subscribe((dataArray: Data[]) => {
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
