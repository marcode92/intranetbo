import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VvfapiService } from 'src/app/services/vvfapi.service';
import { Color } from '../page/page.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface Node {
  name: string;
  children?: Node[];
}

const NODE: Node[] = [
  {
    name: 'FORNITURE',
    children: [],
  },
  {
    name: 'FORMAZIONE',
    children: [],
  },
  {
    name: 'DISTACCAMENTI',
    children: [],
  },
]

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-uffici',
  templateUrl: './uffici.component.html',
  styleUrls: ['./uffici.component.css']
})
export class UfficiComponent {
  token: string;

 /*  constructor(private readonly vvfapiService: VvfapiService, private readonly authService: AuthenticationService){
    this.token = authService.getToken();
   } */

  title = "UFFICI AMMINISTRATIVI"
  text = "Selezionare nel menù laterale il contenuto che si desidera visualizzare";
  class = ""
  content = ""
  openMenu : boolean = false;

  onClick(node: FlatNode) {
    this.openMenu = true;
    this.text = node.name;
    this.class = "content-text-title"
    this.content = "<app-odg></app-odg>"
  }


  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = NODE;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
  

