import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { VRInputComponent } from '../../components/shared/vr-input/vr-input.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-vehicles-add',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent],
  templateUrl: './vehicles-add.component.html',
  styleUrl: './vehicles-add.component.scss'
})
export class VehiclesAddComponent implements OnInit {

  inSubmission = false; 

  userDetails:any

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  isModalVisible:boolean = false;
  
    // List of items to display in the dropdown
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' }
  ];
  
  showAlert = false;
  alertMsg = 'please wait your account is being created';
  alertColor = 'primary';

  years: number[] = [];
  // make: any;

  constructor(
    private router: Router
  ) {

    this.addVTypeForm.get('is_active')?.valueChanges.subscribe(value => {
      console.log('Boolean value:', value);
    });
    
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.years.push(year);
    }

    this.addVTypeForm.get('year')?.valueChanges.subscribe(value => {
      console.log('Selected year:', value);
    });
  } 

  ngOnInit(){
    this.isModalVisible = true;
    this.getVehicleMAke().subscribe(
      {
        next: (res: any) => {
          this.make = res.data.vehicle_make
          console.log('vehicle make',this.make)
        },
        error: (err: any) => {
          console.error('error', err);
          alert(err.error.data.message)
        }
      }
    )
  
 
  }

  getVehicleMAke(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/vehicle/make/index`);
  }




    vehicle_type = new FormControl('', [Validators.required])
    per_km_rate = new FormControl('', [Validators.required])
    per_minute_rate = new FormControl('', [Validators.required])
    base_fare = new FormControl('', [Validators.required])
    tolls_fees = new FormControl('', [Validators.required])
    minimum_fare = new FormControl('', [Validators.required])
    tax_percent = new FormControl('', [Validators.required])
    commission = new FormControl('', [Validators.required])
    cancel_charge_driver = new FormControl('', [Validators.required])
    cancel_charge_rider = new FormControl('', [Validators.required])
    available_seat = new FormControl('', [Validators.required])
    description = new FormControl('', [Validators.required])
    // is_active = new FormControl(true)
    trip_type = new FormControl('', [Validators.required])
    peek_hour_fare = new FormControl('', [Validators.required])
    model = new FormControl('', [Validators.required])
    // make = new FormControl('', [Validators.required])
    year = new FormControl('', [Validators.required])
    vehicle_image = new FormControl('https://cdn.motor1.com/images/mgl/L3787j/s3/2024-mitsubishi-compact-suv.jpg', [Validators.required])
    per_km_rate_share = new FormControl('', [Validators.required])
    per_minute_rate_share = new FormControl('', [Validators.required])
    minimum_fare_share = new FormControl('', [Validators.required])
    base_fare_share = new FormControl('', [Validators.required])
    promo_status = new FormControl('', [Validators.required])
    max_fare_value = new FormControl('', [Validators.required])

    addVTypeForm = new FormGroup({
      vehicle_type: this.vehicle_type,
      per_km_rate: this.per_km_rate,
      per_minute_rate: this.per_minute_rate,
      base_fare: this.base_fare,
      tolls_fees: this.tolls_fees,
      minimum_fare: this.minimum_fare,
      tax_percent: this.tax_percent,
      commission: this.commission,
      cancel_charge_driver: this.cancel_charge_driver,
      cancel_charge_rider: this.cancel_charge_rider,
      available_seat: this.available_seat,
      description: this.description,
      // is_active: true,
      trip_type: this.trip_type,
      peek_hour_fare: this.peek_hour_fare,
      model: this.model,
      year: this.year,
      vehicle_image: this.vehicle_image,
      per_km_rate_share: this.per_km_rate_share,
      per_minute_rate_share: this.per_minute_rate_share,
      minimum_fare_share: this.minimum_fare_share,
      base_fare_share: this.base_fare_share,
      promo_status: this.promo_status,
      max_fare_value: this.max_fare_value

    })
    selectedMake: any;
    make: any;
  

  // const selectedValue = this.form.get('selectedOption').value;
  submit(){
  let addVehicle = {
    ...this.addVTypeForm.value,
    make: this.selectedMake.title,
    is_active: true
  }

  console.log('add vehicle',addVehicle)

   this.showAlert = true;
    this.inSubmission = true
    setTimeout(() => {
      // this.showAlert = true;
  
      this.addVehicleType(addVehicle).subscribe({
        next: (res: any) => {
          console.log(res);
          this.inSubmission = false
          
          if (res.success) {
            alert(res.data.message);
            this.router.navigate(['/vehicles-menu']);
          } else {
            alert(res.data.message);
            this.inSubmission = false
          }
        },
        error: (err: any) => {
          console.error('error',err);
          alert(err.error.data.message);
          this.inSubmission = false
        }
      });
    }, 1000);
   }

  addVehicleType(addVTypeForm:any){
    return this.http.post(`${this.baseUrl}/api/admin/vehicle/type/store`, addVTypeForm)
  }

  reset(){
    this.addVTypeForm.reset()
  }
  close(){
    // window.alert('close')
    this.isModalVisible = !this.isModalVisible
    setTimeout(() => {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, 500);
    this.router.navigate(["/vehicles-menu"])
   }


   showModal() {
     this.isModalVisible = true;
   }
 
   hideModal() {
     this.isModalVisible = false;
   }

   onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
  }

  onMakeSelect(event: any) {
    const selectedMakeId = +event.target.value;
    this.selectedMake = this.make.find((bank: { id: number; }) => bank.id === selectedMakeId);
    console.log(this.selectedMake.title)
  }
 
  


}
