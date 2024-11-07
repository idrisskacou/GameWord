import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchesService } from '../launches/launches.service';
import { Launches } from '../models/launches';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.css'
})
export class LaunchComponent {
isOpen = false;

  openModal(){
    this.isOpen = true;
  }
  closeModal(){
    this.isOpen = false;
  }

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
