import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // Default map options
  options: google.maps.MapOptions = {
    center: { lat: 40.730610, lng: -73.935242 }, // Default to New York City
    zoom: 12,
  };

  constructor() {}

  ngOnInit(): void {
    // Optionally get the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      this.options.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
}
