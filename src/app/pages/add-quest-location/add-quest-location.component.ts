import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { TableModule} from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Button, ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { LoaderComponent } from '../../components/shared/loader/loader.component';


@Component({
  selector: 'app-add-quest-location',
  standalone: true,
  imports: [],
  templateUrl: './add-quest-location.component.html',
  styleUrl: './add-quest-location.component.scss'
})
export class AddQuestLocationComponent implements OnInit {

  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;
  credentials = {
    latitude: "impedit",
    longitude: "asperiores",
    location: "libero",
    point: 54,
    radius: 43003301.6
  }


  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  
  inSubmission = false; 
  questId: any;


  // cities!: City[] |  undefined;
  // userType!: Users[] |  undefined;

  quest!: any;
  userDetails:any

  showAlert:boolean = false;
  alertMsg = 'please wait your account is being created';
  alertColor = 'primary';
  // center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }
  // markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 }
  place:any;
  zoom = 8;

  constructor(private route: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log('my location',
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      )
      
      // this.center = {
      //   lat: coords.latitude,
      //   lng: coords.longitude
      // };
       
      //  this.markerPosition = {
      //   lat: coords.latitude,
      //   lng: coords.longitude
      // };
     
    
    })
    this.questId = this.route.snapshot.paramMap.get('uuid') 
    console.log(this.questId)

    this.getSingleQuest(this.questId).subscribe({
      next: (res:any) => {
        console.log(res.data)
        this.credentials = res.data
        console.log('single quest',this.credentials)
      },
      error: (err:any) => {
        console.error('error', err);
        alert(err.error.data.message)
      }
    }
      
    )
    
  }

  getSingleQuest(questId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/quest/show/${questId}`);
  }

  addLocation(){
    var locationForm = {
      quest_id: this.questId,
      location: this.credentials.location,
      latitude: this.credentials.latitude,
      longitude: this.credentials.longitude,
      point: this.credentials.point,
      radius: this.credentials.radius
    }
    console.log(locationForm)
    this.showAlert = true
    this.alertMsg =   `Adding Location to ${this.quest?.title} ...`
    // this.admin.addQuestLocation(locationForm).subscribe({
    //   next: (res:any) => {
    //     console.log(res)
    //  if(res.code === 200){
    //   this.alertMsg = 'Quest Location Added',
    //   this.alertColor = 'success'
    //   setTimeout(() => {
    //     this.showAlert = false
    //     }, 1600)
    //  } else {
    //   this.alertMsg = 'Failed to Add Location, ERROR from Server ',
    //   this.alertColor = 'danger'
    //  }
    //   }
    // })
  }

  mapClicked(event: any) {
    this.credentials.latitude = event.latLng.lat().toString();
    this.credentials.longitude = event.latLng.lng().toString();
    console.log('Latitude:', this.credentials.latitude);
    console.log('Longitude:', this.credentials.longitude);
  }

  onSearchInput() {
    const input = this.searchInput.nativeElement.value;
    if (input) {
      // const autocomplete = new google.maps.places.AutocompleteService();
      // autocomplete.getPlacePredictions({ input }, (predictions, status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
      //     // Display predictions on the UI
      //     this.displayPredictions(predictions);
      //     // console.log(predictions);
  
      //     // Update center and marker position based on the first prediction
      //     if (predictions.length > 0) {
      //       const firstPrediction = predictions[0];
      //       const placeId = firstPrediction.place_id;
      //       const placesService = new google.maps.places.PlacesService(document.createElement('div'));
      //       placesService.getDetails({ placeId }, (placeResult, placeStatus) => {
      //         if (placeStatus === google.maps.places.PlacesServiceStatus.OK && placeResult?.geometry) {
      //           // console.log('lat',placeResult.geometry.location?.lat(),'long', placeResult.geometry.location?.lng())
      //           // console.log(placeResult,)
      //           this.center = {
      //             lat: placeResult.geometry.location?.lat() || 0,
      //             lng: placeResult.geometry.location?.lng() || 0
      //           };
      //           this.markerPosition = {
      //             lat: placeResult.geometry.location?.lat() || 0,
      //             lng: placeResult.geometry.location?.lng() || 0
      //           };
      //         }
      //       });
      //     }
      //   }
      // });
    }
  }
  
// displayPredictions(predictions: google.maps.places.AutocompletePrediction[]) {
//   // Clear any previous predictions displayed on the UI
//   const predictionsContainer = document.getElementById('predictionsContainer');
//   if (predictionsContainer) {
//     predictionsContainer.innerHTML = '';

//     // Loop through predictions and display them
//     predictions.forEach(prediction => {
//       const predictionElement = document.createElement('div');
//       predictionElement.classList.add('prediction');

//       // Create a map icon using Font Awesome
//       const mapIcon = document.createElement('i');
//       mapIcon.classList.add('fas', 'fa-map-marker', 'map-icon');

//       // Create a span for the prediction text
//       const predictionText = document.createElement('span');
//       predictionText.textContent = prediction.description;

//       // Append the map icon and prediction text to the prediction element
//       predictionElement.appendChild(mapIcon);
//       predictionElement.appendChild(predictionText);

//       // Add event listeners for prediction hover and selection
//       predictionElement.addEventListener('mouseenter', () => {
//         predictionElement.style.backgroundColor = '#ffff00'; // Highlight hovered item
//       });
//       predictionElement.addEventListener('mouseleave', () => {
//         predictionElement.style.backgroundColor = ''; // Remove highlight on mouse leave
//       });
//       predictionElement.addEventListener('click', () => {
//         predictionElement.style.backgroundColor = 'green'; // Highlight hovered item
//         this.onPredictionSelected(prediction);
//       });

//       // Add event listener for prediction selection
//       predictionElement.addEventListener('click', () => {
//         // Call method to handle prediction selection
//         this.onPredictionSelected(prediction);
//       });

//       // Append the prediction element to the predictions container
//       predictionsContainer.appendChild(predictionElement);
//     });
//   }
// }

// onPredictionSelected(prediction: google.maps.places.AutocompletePrediction) {
//   // Retrieve details of the selected place using its place_id
//   const placeId = prediction.place_id;
//   const placesService = new google.maps.places.PlacesService(document.createElement('div'));
//   placesService.getDetails({ placeId }, (placeResult, placeStatus) => {
//     if (placeStatus === google.maps.places.PlacesServiceStatus.OK && placeResult?.geometry) {
//       // Update center and marker position based on the selected place
//       this.center = {
//         lat: placeResult.geometry.location?.lat() || 0,
//         lng: placeResult.geometry.location?.lng() || 0
//       };
//       this.markerPosition = {
//         lat: placeResult.geometry.location?.lat() || 0,
//         lng: placeResult.geometry.location?.lng() || 0
//       };

//       // Stamp the selected location on the form input
//       this.credentials.location = prediction.description || '';
//       this.credentials.latitude = placeResult.geometry.location?.lat().toString() || '';
//       this.credentials.longitude = placeResult.geometry.location?.lng().toString() || '';

//       // Log the selected location's latitude and longitude to the console
//       console.log('Location:', this.credentials.location);
//       console.log('Latitude:', this.credentials.latitude);
//       console.log('Longitude:', this.credentials.longitude);
//     }
//   });

  // Optionally, you can close the predictions container or perform any other action
  // For example, you can clear the predictions displayed on the UI
  // const predictionsContainer = document.getElementById('predictionsContainer');
  // if (predictionsContainer) {
  //   predictionsContainer.innerHTML = '';
  // }
}


  


