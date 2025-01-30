import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {
  @Input() labels: string[] = [] //Valores de labels dataset
  @Input() chartLabel: string = '';  // Etiqueta del dataset
  @Input() data: number[] = [];  // Datos de las barras
  @Input() backgroundColor: string[] = [];  // Colores de fondo
  @Input() borderColor: string[] = [];  // Colores de borde

  chartData: ChartData<'bar'> = {
    labels: this.labels,
    datasets: [{
      label: this.chartLabel,
      data: this.data,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      borderWidth: 1
    }]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data'] || changes['backgroundColor'] || changes['borderColor']) {
      this.chartData = {
        labels: this.labels,
        datasets: [{
          label: this.chartLabel,
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
      };
    }
  }
}
