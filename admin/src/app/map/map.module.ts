import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
// import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    // AgmCoreModule.forRoot({
    //   apiKey:'none'
    // })
  ], 
  exports: [
    MapComponent
  ]
})


export class MapModule { 
   // google maps zoom level
   zoom: number = 8;
  
   // initial center position for the map
   lat: number = 51.673858;
   lng: number = 7.815982;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      // this.center = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // };
    });

    navigator.cookieEnabled
  }
 
  zoomIn() {
    // if (this.zoom < this.options.maxZoom) this.zoom++;
  }
 
  zoomOut() {
    // if (this.zoom > this.options.minZoom) this.zoom--;
  }

  // // google maps zoom level
  // zoom: number = 8;
  
  // // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;

  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }
  
  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }
  
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }
  
  // markers: marker[] = [
	//   {
	// 	  lat: 51.673858,
	// 	  lng: 7.815982,
	// 	  label: 'A',
	// 	  draggable: true
	//   },
	//   {
	// 	  lat: 51.373858,
	// 	  lng: 7.215982,
	// 	  label: 'B',
	// 	  draggable: false
	//   },
	//   {
	// 	  lat: 51.723858,
	// 	  lng: 7.895982,
	// 	  label: 'C',
	// 	  draggable: true
	//   }
  // ]
}
