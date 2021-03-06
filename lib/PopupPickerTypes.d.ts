/// <reference types="react" />
import React from 'react';
export interface IPopupPickerProps {
    picker?: any;
    value?: any;
    triggerType?: string;
    WrapComponent?: any;
    dismissText?: string | React.ReactElement<any>;
    okText?: string | React.ReactElement<any>;
    title?: string | React.ReactElement<any>;
    visible?: boolean;
    disabled?: boolean;
    onOk?: () => void;
    style?: any;
    onVisibleChange?: (visible: boolean) => void;
    content?: React.ReactElement<any> | string;
    onDismiss?: () => void;
    /** react-native only */
    styles?: any;
    /** react-native only */
    actionTextUnderlayColor?: string;
    /** react-native only */
    actionTextActiveOpacity?: number;
    /** web only */
    wrapStyle?: React.CSSProperties;
    /** web only */
    prefixCls?: string;
    className?: string;
    pickerValueProp?: string;
    pickerValueChangeProp?: string;
    /** web only */
    transitionName?: string;
    /** web only */
    maskTransitionName?: string;
}
