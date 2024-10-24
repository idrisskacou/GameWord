import { Component, OnInit } from '@angular/core';
import { Launches } from '../models/launches';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches/launches.service';


@Component({
  selector: 'app-launch-detail-component',
  templateUrl: './launch-detail-component.component.html',
  styleUrl: './launch-detail-component.component.css'
})
export class LaunchDetailComponentComponent implements OnInit{
  launch: Launches | null = null; // Single launch object

  constructor(
    private route: ActivatedRoute,
    private launchesService: LaunchesService
  ) {}

  ngOnInit(): void {
    const launchIdStr = this.route.snapshot.paramMap.get('id'); // Get the ID from the route
    console.log(launchIdStr);
    if (launchIdStr) {
      const launchId = Number(launchIdStr); // Convert string ID to number
      this.launchesService.getLaunchById(launchId).subscribe(
        (data: Launches) => {
          this.launch = data;
          console.log('Fetched launch data:', this.launch);
        },
        error => {
          console.error('Error fetching launch details:', error);
        }
      );
    } else {
      console.error('Launch ID not found in route');
    }
  }

}

