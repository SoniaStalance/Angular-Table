import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/Data';
@Injectable({
  providedIn: 'root'
})

export class ReadJSONService {  
  constructor(private http: HttpClient) {}
  url: string = "../assets/dataset.json";

  getData(){
    const responsedata = this.http.get<Data[]>(this.url);
    console.log(responsedata)
    return responsedata;
  }
}