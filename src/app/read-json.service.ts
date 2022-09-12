import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './Data';
@Injectable({
  providedIn: 'root'
})

export class ReadJSONService {  
  constructor(private http: HttpClient) {}
  url: string = "../assets/dataset.json";

  getData(){
    return this.http.get<Data[]>(this.url);
  }
}