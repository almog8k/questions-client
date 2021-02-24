import { Pipe, PipeTransform } from '@angular/core';
import { ITreeNode } from '../treeModel/inode';

@Pipe({
  name: 'treeFilter'
})
export class TreeFilterPipe implements PipeTransform {

  transform(nodes: ITreeNode[], searchFilter: string) {

    if (searchFilter != "") {
      searchFilter.toLowerCase();
      let tree = nodes;
      let filtered = filterTree(tree, searchFilter);
      return filtered;
    }
    else {
      resetSearch(nodes);
      return nodes;
    }
  }
}

function resetSearch(nodes: ITreeNode[]) {
  nodes.forEach(node => {
    node.expendable = false;
    node.show = true;
    resetSearch(node.children);
  });
}

function filterTree(nodes: ITreeNode[], searchFilter) {
  return nodes.map(node => filterRecursively(node, searchFilter));
}

function filterRecursively(node, searchFilter) {
  let temp;
  let exist = node.title.toLowerCase().includes(searchFilter);
  if (exist) {
    node.show = true;
    node.expendable = true;
    return node;
  }
  if (node.children.length === 0) {
    node.show = false;
    node.expendable = false;
    return node;
  }
  temp = node.children.map(node => filterRecursively(node, searchFilter));
  if (temp.length) {
    node.expendable = true;
    node.show = true;
    node.children = temp;
    return node;
  }
}


