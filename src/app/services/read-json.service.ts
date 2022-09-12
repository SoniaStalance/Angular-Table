import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableItem } from '../models/DataTableItem.model';
@Injectable({
  providedIn: 'root'
})

export class ReadJSONService {  
  constructor(private http: HttpClient) {}
  url: string = "../assets/dataset.json";

  getData(){
    //Observable
    return this.http.get<DataTableItem[]>(this.url);
  }
}