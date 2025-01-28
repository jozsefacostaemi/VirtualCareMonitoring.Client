import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { SignalrService } from '../../shared/services/signalr-service';
import { ChartsService } from '../shared/services/chart.service';
import { MetadataResponse } from '../../shared/models/metadata.model';

@Component({
  selector: 'app-chart-quantity-by-state',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './chart-quantity-by-state.component.html',
  styleUrl: './chart-quantity-by-state.component.css',
})
export class ChartQuantityByStateComponent implements OnInit {
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    }
  };
  public chartType: 'bar' = 'bar';
  public chartLegend: boolean = true;
  constructor(private signalRService: SignalrService, private chartsService: ChartsService) { }
  ngOnInit(): void {
    this.RefreshMonitoring();
    this.signalRService.startConnection();
    this.signalRService.listenForFetchData('RefreshMonitoring');
    this.signalRService.fetchData$.subscribe((data: { eventName: string, payload: any }) => {
      switch (data.eventName) {
        case 'RefreshMonitoring':
          this.RefreshMonitoring();
          break;
        default:
          console.log('Evento no reconocido');
          break;
      }
    });
  }

  RefreshMonitoring() {
    this.chartsService.getQuantityByState().subscribe((result: MetadataResponse<any>) => {
      if (result?.success == true) {
        console.log(result?.data);
        const labels = ['Atención']
        this.chartData.labels = labels;
        this.chartData.datasets = result?.data?.map((item: any) => ({
          data: [item.count],
          label: item.stateName,
          backgroundColor: item.color
        }));
      }
    });
  }



}

