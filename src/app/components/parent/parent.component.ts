import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { ChartsService } from '../shared/services/chart.service';
import { MetadataResponse } from '../../shared/models/metadata.model';
import { SignalrService } from '../../shared/services/signalr-service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [BarChartComponent, PieChartComponent, LineChartComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit {

  constructor(private chartService: ChartsService, private SignalrService: SignalrService) { }

  //GetNumberAttentionsByCity
  public cities: string[] = []
  public countByCities: number[] = []
  public colorsBackGroundCities: string[] = []
  public borderColorCities: string[] = []

  //getQuantityByState
  public states: string[] = []
  public countBystates: number[] = []
  public colorsBackGroundstates: string[] = []
  public borderColorstates: string[] = []

  //GetAttentionsByTime
  public times: string[] = []
  public countBytimes: number[] = []
  public colorsBackGroundtimes: string[] = []
  public borderColortimes: string[] = []

  //GetLogguedByHealthCareStaff
  public loggued: string[] = []
  public countByloggued: number[] = []
  public colorsBackGroundloggued: string[] = []
  public borderColorloggued: string[] = []

  //GetAttentionsFinishByHealthCareStaff
  public AttentionsFinishByHealthCareStaff: string[] = []
  public countByAttentionsFinishByHealthCareStaff: number[] = []
  public colorsBackGroundAttentionsFinishByHealthCareStaff: string[] = []
  public borderColorAttentionsFinishByHealthCareStaff: string[] = []

  //GetCPUStatus
  public labelsCPU: string[] = [];
  public dataCPU: number[] = [];
   public cpuChartData: ChartData<'line'> = {
      labels: Array(10).fill(''),
      datasets: [{ data: Array(10).fill(0), label: 'Uso de CPU (%)', borderColor: '#f54248', fill: true }],
    };

  ngOnInit(): void {
    this.getCPUStatus();
    this.RefreshMonitoring();
    this.listenSignalR();
  }

  /** Función que se encarga de recargar las consultas */
  RefreshMonitoring() {
    this.getNumberAttentionsByCity();
    this.getQuantityByState();
    this.GetAttentionsByTime();
    this.GetLogguedByHealthCareStaff();
    this.GetAttentionsFinishByHealthCareStaff();
  }

  /** Función que obtiene el estado de la CPU */
  getCPUStatus() {
    setInterval(() => {
      this.chartService.getsystem_cpu_usage().subscribe((response: MetadataResponse<any>) => {
        if (response.success && response.data) {
          const cpuUsage = response.data;
          const labels = this.cpuChartData.labels as string[];
          const dataset = this.cpuChartData.datasets[0].data as number[];
          labels.shift();
          labels.push(new Date().toLocaleTimeString());
          dataset.shift();
          dataset.push(cpuUsage);
          this.cpuChartData = { ...this.cpuChartData };
        }
      });
    }, 1000);  // Actualiza cada segundo
  }
  

  /** Función que obtiene el listado de medicos con las atenciones realizadas */
  GetAttentionsFinishByHealthCareStaff() {
    this.chartService.GetAttentionsFinishByHealthCareStaff().subscribe((response: MetadataResponse<any>) => {
      if (response.success && response.data) {
        this.AttentionsFinishByHealthCareStaff = response.data.map((item: any) => item.value);
        this.countByAttentionsFinishByHealthCareStaff = response.data.map((item: any) => item.count);
        this.colorsBackGroundAttentionsFinishByHealthCareStaff = response.data.map((item: any) => item.background);
        this.borderColorAttentionsFinishByHealthCareStaff = response.data.map((item: any) => item.border);
      }
    });
  }

  /** Obtiene el número de atenciones finalizadas por ciudad */
  getNumberAttentionsByCity() {
    this.chartService.GetNumberAttentionsByCity().subscribe((response: MetadataResponse<any>) => {
      if (response.success && response.data) {
        this.cities = response.data.map((item: any) => item.value);
        this.countByCities = response.data.map((item: any) => item.count);
        this.colorsBackGroundCities = response.data.map((item: any) => item.background);
        this.borderColorCities = response.data.map((item: any) => item.border);
      }
    });
  }

  /** Obtiene la cantidad de registros por estado */
  getQuantityByState() {
    this.chartService.getQuantityByState().subscribe((result: MetadataResponse<any>) => {
      if (result.success && result.data) {
        this.states = result.data.map((item: any) => item.value);
        this.countBystates = result.data.map((item: any) => item.count);
        this.colorsBackGroundstates = result.data.map((item: any) => item.background);
        this.borderColorstates = result.data.map((item: any) => item.border);
      }
    });

  }

  /** Obtiene la cantidad de atenciones por fecha */
  GetAttentionsByTime() {
    this.chartService.GetAttentionsByTimeLine().subscribe((response: MetadataResponse<any>) => {
      if (response.success && response.data) {
        this.times = response.data.map((item: any) => item.value);
        this.countBytimes = response.data.map((item: any) => item.count);
        this.colorsBackGroundtimes = response.data.map((item: any) => item.background);
        this.borderColortimes = response.data.map((item: any) => item.border);
      }
    });
  }

  /** Óbtiene el numero de usuarios OnLine y Offline en la aplicación */
  GetLogguedByHealthCareStaff() {
    this.chartService.GetLogguedByHealthCareStaff().subscribe((response: MetadataResponse<any>) => {
      if (response.success && response.data) {
        console.log(response)
        this.loggued = response.data.map((item: any) => item.value);
        this.countByloggued = response.data.map((item: any) => item.count);
        this.colorsBackGroundloggued = response.data.map((item: any) => item.background);
        this.borderColorloggued = response.data.map((item: any) => item.border);
      }
    });
  }

  /** Evento que tiene la escucha activa del SignalR */
  listenSignalR() {
    this.SignalrService.startConnection();
    this.SignalrService.listenForFetchData('Monitoring');
    this.SignalrService.fetchData$.subscribe((data: { eventName: string, payload: any }) => {
      switch (data.eventName) {
        case 'Monitoring':
          this.RefreshMonitoring();
          break;
        default:
          console.log('Evento no reconocido');
          break;
      }
    });
  }
}
