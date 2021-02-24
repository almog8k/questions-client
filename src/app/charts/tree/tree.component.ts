import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ITreeNode } from './treeModel/inode';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input("data") data: ITreeNode[];
  searchText: string = "";
  constructor() { }

  ngOnInit(): void { }

  onSelect(node) {
    let Indeterminate = false;
    node.children.forEach(nodeChild => {
      if (node.isChecked) {
        nodeChild.isChecked = true;
      }
      else {
        nodeChild.isChecked = false;
        Indeterminate = true;
      }
      this.onSelect(nodeChild);
    });
  }

  onExpand(node: ITreeNode) {
    node.expendable ? node.expendable = false : node.expendable = true;
  }

  onCheck(node: ITreeNode) {
    node.isChecked ? node.isChecked = false : node.isChecked = true;
    this.onSelect(node);
  }
}


