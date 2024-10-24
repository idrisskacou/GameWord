import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { LaunchesService } from '../launches.service';
import { Launches } from '../../models/launches';
import { Router } from '@angular/router';

@Component({
  selector: 'launches-list',
  templateUrl: './launches-list.component.html',
  styleUrl: './launches-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LaunchesListComponent implements OnInit{

  launches: Launches[] = [];

  constructor(private launchesService: LaunchesService, private router: Router) {}

  ngOnInit(): void {
    this.goToLaunchDetails;
    this.launchesService.getLaunches().subscribe(data => {
      // Ensure that 'data' is an object and convert it into an array
      if (data && typeof data === 'object') {
        const launchesArray = Object.values(data); // Convert object to array of values
  
        // Apply .map() on the array to add the 'isExpanded' field
        this.launches = launchesArray
          .filter((launch): launch is Launches => typeof launch === 'object' && launch !== null) // Filter out invalid data
          .map(launch => ({
            ...launch,
            isExpanded: false // Add an isExpanded field to track expansion state
          }));
      } else {
        console.error('Expected an object but received:', data);
      }
    }, error => {
      // Handle errors when making the API call
      console.error('Error fetching launches:', error);
    });
    
  };
  
  toggleDetails(launch: Launches): void {
    launch.isExpanded = !launch.isExpanded;
  };

  goToLaunchDetails(launchId: number | undefined): void {
    if (launchId !== undefined) {
      this.router.navigate(['/launch', launchId.toString()]); // Navigate to the correct detail route
    } else {
      console.error('Launch ID is undefined');
    }
  }; 

  
}

