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


  overTreeSelect(node: ITreeNode) {
    node.children.forEach(nodeChild => {
      if (node.isChecked) {
        nodeChild.isChecked = true;
        nodeChild.indeterminate = false;
      }
      else {
        nodeChild.isChecked = false;

      }
      this.overTreeSelect(nodeChild);
    });
  }
  overTreeindeterminate(node: ITreeNode) {
    let checkedCount = 0

    if (node.parent) {
      node.parent.children.forEach(nodeChild => {
        if (nodeChild.isChecked) {
          checkedCount++;
        }
      });
      node.parent.isChecked = false;
      node.parent.indeterminate = true;
      if (checkedCount === 0) {
        node.parent.isChecked = false;
        node.parent.indeterminate = false;
      }
      if (checkedCount === node.parent.children.length) {
        node.parent.isChecked = true;
        node.parent.indeterminate = false;
      }
      if (node.indeterminate) {
        node.parent.indeterminate = true;
      }
      this.overTreeindeterminate(node.parent);
    }
  }
  onSelect(node: ITreeNode) {
    this.overTreeSelect(node);
    this.overTreeindeterminate(node);
  }

  onExpand(node: ITreeNode) {
    node.expendable ? node.expendable = false : node.expendable = true;
  }

  onCheck(node: ITreeNode) {
    node.isChecked ? node.isChecked = false : node.isChecked = true;
    this.onSelect(node);
  }
}


