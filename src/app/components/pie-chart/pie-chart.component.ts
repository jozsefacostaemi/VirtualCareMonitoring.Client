import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges {

  @Input() labels: string[] = [] //Valores de labels dataset
  @Input() data: number[] = [];  // Datos de las barras  
  @Input() chartLabel: string = '';  // Etiqueta del dataset
  @Input() backgroundColor: string[] = [];  // Colores de fondo
  @Input() borderColor: string[] = [];  // Colores de borde
  @Input() unitLabel: string = 'units'; // Valor por defecto

  // Datos de la gráfica
  public pieChartData: ChartData<'pie'> = {
    labels: this.labels,
    datasets: [{
      data: this.data,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      borderWidth: 1
    }]
  };

  // Opciones de la gráfica
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => this.customTooltipLabel(tooltipItem)  // Usar función externa para el tooltip
        }
      }
    },
  };

   // Función externa para manejar el tooltip dinámico
   private customTooltipLabel(tooltipItem: any): string {
    return tooltipItem.raw + ' ' + this.unitLabel;  // Concatenar el valor dinámico con el valor del tooltip
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data'] || changes['backgroundColor'] || changes['borderColor']) {
      this.pieChartData = {
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
