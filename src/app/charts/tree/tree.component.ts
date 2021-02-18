import { Component, Input, OnInit } from '@angular/core';
import { ITreeNode } from './treeModel/inode';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() data: ITreeNode[];
  constructor() { }

  ngOnInit(): void {


  }


  onExpand(node) {
    let flag = false;
    if (node.expendable) {
      flag = true;
    }
    return flag;
  }

}
