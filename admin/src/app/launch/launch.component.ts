import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LaunchesService } from '../launches/launches.service';
import { Launches } from '../models/launches';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.css'
})
export class LaunchComponent implements Resolve<Launches>, OnInit{
isOpen = false;
launch: Launches | null = null; // Single launch object

constructor(
  private route: ActivatedRoute,
  private launchesService: LaunchesService
) {}

openModal() {
  this.isOpen = true;
}

closeModal() {
  this.isOpen = false;
}

ngOnInit(): void {
  this.launch = this.route.snapshot.data['launch']; // Get resolved data
  console.log('Fetched launch data:', this.launch);
}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Launches> {
  const launchIdStr = route.paramMap.get('id'); // Get the ID from the route
  if (launchIdStr) {
    const launchId = Number(launchIdStr); // Convert string ID to number
    return this.launchesService.getLaunchById(launchId); // Return Observable
  } else {
    console.error('Launch ID not found in route');
  }
  throw new Error('Launch ID not found in route');
  }
}
