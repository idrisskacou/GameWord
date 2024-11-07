import { Component, Inject, OnInit, OnDestroy, OnChanges, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { NavigationStart } from '@angular/router';
import { Launches } from '../models/launches';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, OnChanges {
  isOpen = false;
  userAgent: string = '';
  chart: any = [];
  pie: any = [];
  gauge: any = [];
  weather: string = "58 Lompoc, CA";
  columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
  label = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  series = ['Space X', 'ULA', 'Arianespace'];
  piedata = [20, 40, 30] as unknown as Observable<NavigationStart>;
  data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  displayedColumns: string[] = ['id', 'date', 'title', 'company'];
  launchDataSource: Launches[] = [];
  dataSource = this.launchDataSource;
launch: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    // Check if running in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      const chartElement = document.getElementById('canvas');
      const pieElement = document.getElementById('piechart');

      console.log(chartElement);
      console.log(pieElement);

      this.pie = new Chart('piechart', {
        type: 'doughnut',
        data: {
          labels: this.series,
          datasets: [{
            label: 'Pie Chart',
            data: [20, 40, 30],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
          }],
        }
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.label,
          datasets: [
            {
              label: 'Launch Trend',
              data: [10, 15, 8, 12, 4, 18, 2, 5, 9, 13, 7, 3],
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: 'red'
              },
              ticks: {
                color: 'blue'
              }
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  ngOnChanges(): void {
    console.log('Changes detected');
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }
}
