import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

@Component({
  selector: 'app-vehicle-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ModalComponent, ButtonComponent, HttpClientModule, LoaderComponent],
  templateUrl: './vehicle-edit.component.html',
  styleUrl: './vehicle-edit.component.scss'
})
export class VehicleEditComponent implements OnInit {

  private baseUrl = environment.serverUrl;
  private http = inject(HttpClient);

  inSubmission = false;
  vehicleId!: any; 

  vehicleType!: any;
  isModalVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { 
    this.isModalVisible = true
  this.vehicleId = this.route.snapshot.paramMap.get('uuid')
  console.log(this.vehicleId)
  this.getSingleVehicle(this.vehicleId).subscribe(
    (res:any)=>{
      console.log('single user',res)
      this.vehicleType = res.data.vehicle_type
      console.log('vehicle type',this.vehicleType)


  }
  )}

  getSingleVehicle(vehicleId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/vehicle/type/show/${vehicleId}`);
  }

  update() {

    this.inSubmission = true;
   
    var editVehicleForm = {
      vehicle_type: this.vehicleType.vehicle_type,
      minimum_fare: this.vehicleType.minimum_fare,
      make: this.vehicleType.make,
      model: this.vehicleType.model,
      trip_type: this.vehicleType.trip_type,
      commission: this.vehicleType.commission,
      per_km_rate: this.vehicleType.per_km_rate,
      is_active:true,
      per_minute_rate: this.vehicleType.per_minute_rate,
      base_fare: this.vehicleType.base_fare,
      tolls_fees: this.vehicleType.tolls_fees,
      available_seat: this.vehicleType.available_seat,
      description: this.vehicleType.description,
      year: this.vehicleType.year,
      cancel_charge_driver: this.vehicleType.cancel_charge_driver,
      cancel_charge_rider: this.vehicleType.cancel_charge_rider,
      peek_hour_fare: this.vehicleType.peek_hour_fare,
      // vehicle_image: this.vehicleType.vehicle_image,  to be implemente
      vehicle_image: "https://cdn.motor1.com/images/mgl/L3787j/s3/2024-mitsubishi-compact-suv.jpg",
      per_km_rate_share: this.vehicleType.per_km_rate_share,
      per_minute_rate_share: this.vehicleType.per_minute_rate_share,
      minimum_fare_share: this.vehicleType.minimum_fare_share,
      base_fare_share: this.vehicleType.base_fare_share,
      promo_status: true,
      max_fare_value: this.vehicleType.max_fare_value,
      tax_percent: this.vehicleType.tax_percent
    };

    console.log(editVehicleForm)
    this.updateVehicle(editVehicleForm, this.vehicleId).subscribe({
      next: (res:any) => {
        console.log(res)
        this.inSubmission = false  
        alert('successfully updated')
      },
      error: (err:any) => {
        console.log('error occured',err);
        this.inSubmission = false
        alert(err.error.data.message)
        
      }
    })
   
  }

  deleteVehicle() {
      window.alert('are you sure?');
      const vehicleId = this.vehicleId;
      console.log(vehicleId)
  
        this.deleteVehicleType(vehicleId).subscribe({
        next: (res:any) => {
          console.log(res)
          this.inSubmission = false
          alert('successfully deleted')
            
        },
        error: (err:any) => {
          console.log('error occured',err);
          this.inSubmission = false
          alert(err.error.data.message)
          
        }
          
        })
    
    }
    deleteVehicleType(vehicleId:any) {
      return this.http.delete(`${this.baseUrl}/api/admin/vehicle/type/destroy/${vehicleId}`);
    }
    updateVehicle(editVehicleForm: object, vehicleId:any) {
      return this.http.put(`${this.baseUrl}/api/admin/vehicle/type/update/${vehicleId}`, editVehicleForm);
    }

    close(){
      this.isModalVisible = !this.isModalVisible
      this.router.navigate(["/vehicles-menu"])
     }


   showModal() {
     this.isModalVisible = true;
   }
 
   hideModal() {
     this.isModalVisible = false;
   }




  

}
