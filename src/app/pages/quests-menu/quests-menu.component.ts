import { Component, ViewChild } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import { AdminViewComponent } from '../admin-view/admin-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminViewQuestComponent } from '../admin-view-quest/admin-view-quest.component';
@Component({
  selector: 'app-quests-menu',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, ReactiveFormsModule, MapsComponent, AdminViewQuestComponent],
  templateUrl: './quests-menu.component.html',
  styleUrl: './quests-menu.component.scss'
})
export class QuestsMenuComponent {
  @ViewChild(  MapsComponent) childRef!:   MapsComponent;
  @ViewChild( AdminViewQuestComponent) childRef2!:  AdminViewQuestComponent;
  @ViewChild( AdminViewQuestComponent) exportRef2!:  AdminViewQuestComponent;

  searchText: string = ''

  pages = [
    { id: 1, name: "Maps", },
    // { id: 2, name: "Quests", },
  

 ]


  activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;
  }

  getRouterLink(index: number): string {
    switch(index) {
      case 0:
        return '/';
      case 1:
        return '/add-quest';
      case 2:
        return '/';
      case 3:
        return '/';
      default:
        return '/';
    }
  }

 
  applySearch(){
    this.childRef2.applyFilter()
  }
  
  
  export(){
    this.exportRef2.exportExcel()
  }


}
