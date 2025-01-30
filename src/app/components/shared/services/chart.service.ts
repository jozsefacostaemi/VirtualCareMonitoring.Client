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

  getsystem_cpu_usage(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetUsageCPU`);
  }

  GetAttentionsByTimeLine(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetAttentionsByTimeLine`);
  }

  GetNumberAttentionsByCity(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetNumberAttentionsByCity`);
  }

  GetLogguedByHealthCareStaff(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetLogguedByHealthCareStaff`);
  }
  GetAttentionsFinishByHealthCareStaff(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetAttentionsFinishByHealthCareStaff`);
  }

  GetQueuesActive(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetQueuesActive`);
  }

  GetNumberActive(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetNumberActive`);
  }
  GetPercentAttentionsFinish(): Observable<MetadataResponse<any>> {
    return this.http.get<MetadataResponse<any>>(`${this.apiUrl}/Monitoring/GetPercentAttentionsFinish`);
  }
}
