import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../components/shared/modal/modal.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DialogModule, SidebarComponent, ModalComponent ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  showDropdown = false;
  userDetails:any;
  user:any;
  email:any;
  isCollapsed: boolean = true;
  isSmallScreen = false;
  carret_down =  false;
  carret_up = true;
  openDropdown: number | any;
  displayDialog:boolean = false;
  


    constructor(private router: Router) { }

    ngOnInit() {

      console.log('in admin component');
      this.checkScreenSize();
      const storedUserDetails = localStorage.getItem('userDetails');
      // console.log(storedUserDetails);

      if (storedUserDetails) {
        this.userDetails = JSON.parse(storedUserDetails);
  
      } else {
        console.log('User details not found in localStorage.');
      }
    }
  
    ngOnDestroy() {
      var html = document.getElementsByTagName("html")[0];
      html.classList.remove("auth-layout");
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("bg-default");
    }
  
    
    onLogOut(){
    //  this.displayDialog = !this.displayDialog
    this.isModalVisible = !this.isModalVisible
    this.showDropdown = !this.showDropdown

    }
    close(){
    //  this.displayDialog = !this.displayDialog
    this.isModalVisible = !this.isModalVisible
    }  
  
    pDropdown(){
      this.showDropdown = !this.showDropdown
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
      this.checkScreenSize();
    }
  
    checkScreenSize(): void {
      this.isSmallScreen = window.innerWidth < 1000; // Adjust the breakpoint as needed
    }

    logout(){
      localStorage.clear()
      this.router.navigate(['/sign-in']) 
    }

    isModalVisible: boolean = false;

  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

}
