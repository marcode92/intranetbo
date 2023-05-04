import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface Node {
  name: string;
  children?: Node[];
}

const NODE: Node[] = [
  {
    name: 'ODG',
    children: [{name: 'ODG-2023'}, {name: 'ODG-2022'}, {name: 'ODG-2021'}, {name: 'ODG-STORICO'}],
  },
  {
    name: 'DDS',
    children: [{name: 'DDS-2023'}, {name: 'DDS-2022'}, {name: 'DDS-2021'}],
  },
  {
    name: 'POS',
    children: [{name: 'POS-2023'}, {name: 'POS-2022'}],
  },
]

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-archivio',
  templateUrl: './archivio.component.html',
  styleUrls: ['./archivio.component.css']
})
export class ArchivioComponent {
  title = "Archivio"
  text = "Selezionare nel menù laterale il contenuto che si desidera visualizzare";
  class = ""
  content = ""

  onClick(node: FlatNode) {
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
