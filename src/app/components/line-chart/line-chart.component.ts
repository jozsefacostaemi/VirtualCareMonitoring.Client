import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnChanges {

  @Input() labels: string[] = ['1', '2', '3'] //Valores de labels dataset
  @Input() chartLabel: string = '';  // Etiqueta del dataset
  @Input() data: number[] = [6, 5, 9];  // Datos de las barras
  @Input() backgroundColor: string = 'rgb(75, 192, 192)';  // Colores de fondo
  @Input() borderColor: string = 'rgb(75, 192, 192)';  // Colores de borde
  @Input() heightChart: number = 150; // Valor inicial de height
  @Input() widthChart: number = 300;  // Valor inicial de width

  get divStyle() {
    return {
      width: `${this.widthChart}px`,
      height: `${this.heightChart}px`
    };
  }


  @Input() ChartDataLine: ChartData<'line'> = {
    labels: this.labels, // Etiquetas de los meses
    datasets: [{
      label: this.chartLabel,
      data: this.data, // Valores para cada mes
      fill: true, // No llenar el área bajo la línea
      borderColor: this.borderColor, // Color de la línea
      tension: 0.1, // Curvatura de la línea
      pointBackgroundColor: this.backgroundColor, // Color de los puntos
      pointRadius: 5, // Tamaño de los puntos
      pointHoverRadius: 7, // Tamaño de los puntos al pasar el mouse
    }]
  };

  // Opciones de la gráfica
  public lineChartOptions: ChartOptions = {
    responsive: true, // Hacer que la gráfica sea responsive
    scales: {
      // x: {
      //   title: {
      //     display: true,
      //     text: 'Meses' // Título para el eje X
      //   }
      // },
      // y: {
      //   title: {
      //     display: true,
      //     text: 'Ventas' // Título para el eje Y
      //   }
      // }
    },
    plugins: {
      legend: {
        position: 'top', // Ubicación de la leyenda
      },
      tooltip: {
        enabled: true, // Mostrar el tooltip al pasar el mouse
      }
    }
  };

  // Tipo de la gráfica (en este caso, 'line' para gráfica de líneas)
  public lineChartType: 'line' = 'line';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data']) {
      this.ChartDataLine = {
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
