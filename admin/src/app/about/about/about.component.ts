import { Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js/auto';
import { Observable } from 'rxjs';
import { NavigationStart } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { Launches } from '../../models/launches';
import { environment } from '../../../environments/environment';
export interface PeriodicElement {

  id: number; // internal MongoDB primary key
  upcoming_launch_image: string;
  upcoming_launch_title: string ;
  upcoming_launch_date: string ;
  upcoming_launch_time: string ;
  upcoming_launch_base: string;
  upcoming_launch_location: string;
  upcoming_launch_rocket: string ;
  upcoming_launch_description: string ;
  upcoming_launch_company: string ;
  url: string ;
}
const ELEMENT_DATA: PeriodicElement[] = [

  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Falcon 9 - Starlink 28', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'Space X', url: 'x.com', upcoming_launch_time: '',
    id: 0
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Ariane 5 - VA257', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'Arianespace', url: 'x.com', upcoming_launch_time: '',
    id: 1
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Atlas V - NROL-101', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'ULA', url: 'x.com', upcoming_launch_time: '',
    id: 2
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Falcon 9 - Crew-8 Mission', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'SpaceX', url: 'x.com', upcoming_launch_time: '',
    id: 3
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Space X', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'Space X', url: 'x.com', upcoming_launch_time: '',
    id: 4
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Space X', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'Space X', url: 'x.com', upcoming_launch_time: '',
    id: 5
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Space X', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'Space X', url: 'x.com', upcoming_launch_time: '',
    id: 6
  },
  {
    upcoming_launch_image: '1', upcoming_launch_title: 'Space X', upcoming_launch_date: '11/10/2016', upcoming_launch_base: 'Vandenberg SFB', upcoming_launch_location: 'California', upcoming_launch_rocket: 'X', upcoming_launch_description: 'loream', upcoming_launch_company: 'Space X', url: 'x.com', upcoming_launch_time: '',
    id: 7
  },

];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ]
})


export class AboutComponent implements OnInit, OnDestroy {

  // Define value
  userAgent: string = '';
  countdownTime: number = 60; // Countdown time in seconds
  countdownInterval: any;
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
  


  // Method to capture mouse coordinates
  getMouseCoordinates(event: MouseEvent): void {
    this.x = event.clientX;
    this.y = event.clientY;
  }
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


  // Start the countdown
  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
        this.updateCountdownDisplay(this.formatTime(this.countdownTime));
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }

  // Stop the countdown
  stopCountdown(): void {
    clearInterval(this.countdownInterval);
    // this.updateCountdownDisplay('Time is up!');
  }

  // Format the countdown time to MM:SS
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
    // Update the countdown display
  updateCountdownDisplay(time: string): void {
    const countdownElement = document.getElementById('countdown-display');
    if (countdownElement) {
      countdownElement.innerText = time; // Update the text inside the element
    } else {
      console.error('Countdown display element not found');
    }
  }

  ngOnInit(): void{
    this.startCountdown(); // Start the countdown on initialization
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
      type: 'bar',
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
        scales: {
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
      this.stopCountdown(); // Clear interval to prevent memory leaks
    };

    valuePass(name: string, position: number, weight: number, symbol: string): void {
      console.log(name, position, weight, symbol);
    }

}
