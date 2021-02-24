export interface ITreeNode {
    title: string;
    children: ITreeNode[];
    show: boolean;
    indeterminate: boolean;
    expendable: boolean;
    isChecked: boolean;
}