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
  selector: 'app-vehicle-make-add',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent],
  templateUrl: './vehicle-make-add.component.html',
  styleUrl: './vehicle-make-add.component.scss'
})
export class VehicleMakeAddComponent implements OnInit  {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  isModalVisible: boolean = false;
  inSubmission = false; 

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isModalVisible = true;
  }

  title =  new FormControl('',[Validators.required, Validators.minLength(3)]);
  description =  new FormControl('',[Validators.required, Validators.minLength(3)]);

  addVehicleMakeForm = new FormGroup({
    title: this.title,
    description: this.description
  })

  submit(){

    console.log(this.addVehicleMakeForm.value)
    let addVehicle = {
      ...this.addVehicleMakeForm.value
    }
    this.inSubmission = true
    this.addVehicleMake(addVehicle).subscribe({
      next: (res: any) => {
        console.log(res);
        this.inSubmission = false
        alert(res.data.message);
        this.router.navigate(['/vehicles_menu']);
       
      },
      error: (err: any) => {
        console.error('error',err);
        alert(err.error.data.message);
        this.inSubmission = false
      }
    })
    
  }

  addVehicleMake(addVehicleMakeForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/vehicle/make/store`, addVehicleMakeForm)
  }
  reset(){
    this.addVehicleMakeForm.reset()
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

}
