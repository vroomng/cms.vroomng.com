import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoaderComponent implements OnInit {
  @Input() color = '';


  constructor() { }

  ngOnInit(): void {
  }
  
    get bgColor(){
      return `bg-${this.color}`
    }

}
