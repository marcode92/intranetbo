import { Component } from '@angular/core';

export class Color {
  name: string;
  color: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  colors : Color[] = [
    {name: "VVF_RED", color: '#aa2824'},
    {name: "WHITE", color: '#FFFFFF'},
  ];
}
