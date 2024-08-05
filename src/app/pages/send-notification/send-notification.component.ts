import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VRInputComponent } from '../../components/shared/vr-input/vr-input.component';

@Component({
  selector: 'app-send-notification',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent],
  templateUrl: './send-notification.component.html',
  styleUrl: './send-notification.component.scss'
})
export class SendNotificationComponent implements OnInit {
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

  title =  new FormControl('',[Validators.required, Validators.minLength(5)]);
  media =  new FormControl('',[Validators.required, Validators.minLength(5)]);
  schedule =  new FormControl('',[Validators.required, Validators.minLength(5)]);
  user_type =  new FormControl('',[Validators.required, Validators.minLength(5)]);
  user_status =  new FormControl('',[Validators.required, Validators.minLength(5)]);
  message =  new FormControl('',[Validators.required, Validators.minLength(5)]);
  message_type =  new FormControl('',[Validators.required, Validators.minLength(5)]);

  sendNotificationForm = new FormGroup({

      title: this.title,
      media: this.media,
      schedule: this.schedule,
      user_type: this.user_type,
      user_status: this.user_status,
      message: this.message,
      message_type: this.message_type
  })

  submit(){

    console.log(this.sendNotificationForm.value)
   
    this.inSubmission = true

    this.sendNotification(this.sendNotificationForm.value ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.inSubmission = false
        alert(res.data.message);
        this.router.navigate(["/app-actions-menu"])
      },
      error: (err: any) => {
        console.error('error',err);
        alert(err.error.data.message);
        this.inSubmission = false
      }
    })
    
  }

  sendNotification(sendNotificationForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/notification/send`, sendNotificationForm)
  }

  reset(){
    this.sendNotificationForm.reset()
  }
  close(){

    this.router.navigate(["/app-actions-menu"])
   }
  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }
}
