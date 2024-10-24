import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { NavigationStart } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { Launches } from '../models/launches';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
   // Define value
   userAgent: string = '';
  //  countdownTime: number = 60; // Countdown time in seconds
  //  countdownInterval: any;
   chart: any = [];
   pie: any = []
   gauge: any = [];
   weather :string = " 58 Lompoc, CA";
   columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
   lable = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   series = ['Space X', 'ULA','Arianespace'];
   piedata =[20, 40, 30] as unknown as Observable<NavigationStart>;
   data = [
     [65, 59, 80, 81, 56, 55, 40],
     [28, 48, 40, 19, 86, 27, 90]
   ];
   x: number = 0;
   y: number = 0;
   displayedColumns: string[] = ['id', 'date', 'title', 'company'];
   // private apiURL = environment.apiURL
   lauchDataSource: Launches[] = []
   // dataSource = ELEMENT_DATA;
   dataSource = this.lauchDataSource;
   
 
 

   // Method that updates the weather string
   updateWeather(newWeather: string): void {
     this.weather = newWeather;
     // Update the DOM element with the new weather string using document.getElementById()
     const weatherchart = document.getElementById("weatherchart");
     const weatherElement = document.getElementById('weatherchart');
     if (weatherchart) {
       weatherchart.innerText = this.weather; // Update the text inside the element
     } else {
       console.error('Weather display element not found');
     }
   }

   ngOnInit(): void{
     this.updateWeather('72 Los Angeles, CA');
     const chartElement = document.getElementById('canvas');
     const pieElement = document.getElementById('piechart');
     const gaugeChart = document.getElementById('gaugeChart');
     const weatherchart = document.getElementById("weatherchart")
     const countdownElement = document.getElementById('countdown-display');
     console.log(chartElement);
     console.log(this.updateWeather);
     console.log(chartElement);
     
     this.pie = new Chart ('piechart', {
       type: 'doughnut',
       data: {
         labels: this.series,
         datasets: [{
           label: 'Pie Chart',
           data: this.piedata,
         }],
       }
     })
 
     // this is bar graph 
     this.chart = new Chart('canvas', {
       type: 'line',
       data: {
         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
         datasets: [
           {
             label: 'Launch Trend',
             data: [10, 15, 8, 12, 4, 18, 2, 5, 9, 13, 7, 3],
           },
         ],
       },
       options: {
        // responsive: true,
         scales: {
          x: {
            grid: {
              tickColor: 'red'
            },
            ticks: {
              color: 'blue',
            }
          },
           y: {
             beginAtZero: true,
           },
         },
       },
     });


     // this is the gauge graph
     this.gauge = new this.chart('gaugeChart', {
       type: 'doughnut',
       data: {
         labels: [],  // No labels needed for this chart
         datasets: [{
           data: [65, 100 - 65],  // NeedleValue (65%) and remaining (35%)
           backgroundColor: [
             'rgba(63, 191, 63, 0.8)',  // Filled part (needle value area)
             'rgba(229, 229, 229, 0.8)'  // Unfilled part (remaining area)
           ],
           borderWidth: 0  // No borders for the segments
         }]
       },
       options: {
         responsive: false,  // Disable responsiveness for a fixed aspect ratio
         aspectRatio: 2,  // Keep a 2:1 aspect ratio
         rotation: -90,  // Start angle for the semi-circle
         cutout: '50%',  // Cut out 50% to make a semi-circle
         circumference: 180,  // Set to 180 degrees for half circle
         plugins: {
           legend: {
             display: false  // Hide the legend
           },
           tooltip: {
             enabled: false  // Disable tooltips
           }
         },
         animation: {
           animateRotate: true,  // Enable rotation animation
           animateScale: true  // Enable scaling animation
         },
         layout: {
           padding: {
             bottom: 3  // Padding to adjust layout
           }
         }
       }
 
     })
   };
 
     // Lifecycle hook to clean up the interval when the component is destroyed
     ngOnDestroy(): void {
       console.log('Called on destroy')
     };
 
     valuePass(name: string, position: number, weight: number, symbol: string): void {
       console.log(name, position, weight, symbol);
     }
 
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { chartgraph: 'Launch Trend', cols: 1, rows: 1 },
          { piegraph: 'Launch Company', cols: 1, rows: 1 },
          { statustable: 'Launch Status', cols: 1, rows: 1 },
          { newtable: 'News', cols: 1, rows: 1 }
        ];
      }

      return [
        { chartgraph: 'Launch Trend', cols: 2, rows: 1 },
        { piegraph: 'Launch Company', cols: 1, rows: 1 },
        { statustable: 'Launch Status', cols: 1, rows: 2 },
        { newtable: 'News', cols: 1, rows: 1 }
      ];
    })
  );
}
