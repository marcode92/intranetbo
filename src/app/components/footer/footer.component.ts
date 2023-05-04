import { Component } from '@angular/core';

export interface Tile {
  id: number;
  color: string;
  cols: number;
  rows: number;
}


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  //Header grid subdivision
  tiles: Tile[] = [
    {id: 1, cols: 3, rows: 2, color: '#88201d'},
    {id: 2, cols: 1, rows: 1, color: '#aa2824'},
    {id: 3, cols: 1, rows: 1, color: '#aa2824'},
    {id: 4, cols: 1, rows: 1, color: '#aa2824'},
  ]
}

