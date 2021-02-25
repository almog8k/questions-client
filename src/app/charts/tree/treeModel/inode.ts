export interface ITreeNode {
    title: string;
    children: ITreeNode[];
    show: boolean;
    parent: ITreeNode;
    indeterminate: boolean;
    expendable: boolean;
    isChecked: boolean;
}