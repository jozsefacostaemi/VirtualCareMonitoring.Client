import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataResponse } from '../../../shared/models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private apiUrl = 'http://localhost:9753';

  constructor(private http: HttpClient) { }

  getQuantityByState(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetQuantityByState`);
  }

  getChart(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/chart`);
  }

 startHttpRequest = () => {
    this.http.get(`${this.apiUrl}/chart`)
      .subscribe((res:any) => {
        console.log(res);
      })
  }
}
