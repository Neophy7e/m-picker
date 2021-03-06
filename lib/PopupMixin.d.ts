declare var _default: {
    getDefaultProps(): {
        onVisibleChange: () => void;
        okText: string;
        pickerValueProp: string;
        pickerValueChangeProp: string;
        dismissText: string;
        title: string;
        onOk: () => void;
        onDismiss: () => void;
    };
    getInitialState(): {
        pickerValue: any;
        visible: any;
    };
    componentWillReceiveProps(nextProps: any): void;
    onPickerChange(pickerValue: any): void;
    saveRef(picker: any): void;
    setVisibleState(visible: any): void;
    fireVisibleChange(visible: any): void;
    getRender(): any;
    onTriggerClick(e: any): void;
    onOk(): void;
    getContent(): any;
    onDismiss(): void;
    hide(): void;
};
export default _default;
