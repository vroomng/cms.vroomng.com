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


interface AccessResult {
  [key: string]: boolean;
}

@Component({
  selector: 'app-access-control',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ModalComponent, ButtonComponent, HttpClientModule, LoaderComponent],
  templateUrl: './access-control.component.html',
  styleUrl: './access-control.component.scss'
})


export class AccessControlComponent implements OnInit {

  private baseUrl = environment.serverUrl;
  private http = inject(HttpClient);
  adminId!:any
  admin:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.adminId = this.route.snapshot.paramMap.get('uuid')
    console.log(this.adminId)

    this.getSingleUser(this.adminId).subscribe(
      (res:any)=>{
        console.log('single user',res)
        this.admin = res.data
        console.log(this.admin.user.email)

    })

  }
  accessTypes = ['Read', 'Write', 'Update', 'Delete'];
  permissions = ['Allow', 'Deny'];
  accesses = [
    { selectedAccessType: this.accessTypes[0], selectedPermission: this.permissions[0], result: '' },
    { selectedAccessType: this.accessTypes[0], selectedPermission: this.permissions[0], result: '' },
    { selectedAccessType: this.accessTypes[0], selectedPermission: this.permissions[0], result: '' },
    { selectedAccessType: this.accessTypes[0], selectedPermission: this.permissions[0], result: '' },
  ];

  onAccessTypeChange(index: number) {
    console.log(`Access Type ${index}:`, this.accesses[index].selectedAccessType);
    this.updateResult(index);
  }

  onPermissionChange(index: number) {
    console.log(`Permission ${index}:`, this.accesses[index].selectedPermission);
    this.updateResult(index);
  }

  updateResult(index: number) {
    this.accesses[index].result = this.accesses[index].selectedPermission === 'Deny' ? 'False' : 'True';
  }

  saveResults() {
    const results: AccessResult = this.accesses.reduce((acc: AccessResult, access) => {
      acc[access.selectedAccessType.toLowerCase()] = access.result === 'True';
      return acc;
    }, {});

    console.log(results);
    const roles = {
      access: "accusantium",
      ...results
    };

    console.log('access control form',roles);
  }

  addAccess(roles: any) {
    console.log(roles)
     return this.http.post(`${this.baseUrl}/admin/access-control/${this.adminId}`, roles)

  }

  getSingleUser(adminId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/user/${adminId}`);
  }

}
