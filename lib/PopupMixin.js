'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}
exports["default"] = {
    getDefaultProps: function getDefaultProps() {
        return {
            onVisibleChange: noop,
            okText: 'Ok',
            pickerValueProp: 'selectedValue',
            pickerValueChangeProp: 'onValueChange',
            dismissText: 'Dismiss',
            title: '',
            onOk: noop,
            onDismiss: noop
        };
    },
    getInitialState: function getInitialState() {
        return {
            pickerValue: 'value' in this.props ? this.props.value : null,
            visible: this.props.visible || false
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                pickerValue: nextProps.value
            });
        }
        if ('visible' in nextProps) {
            this.setVisibleState(nextProps.visible);
        }
    },
    onPickerChange: function onPickerChange(pickerValue) {
        if (this.state.pickerValue !== pickerValue) {
            this.setState({
                pickerValue: pickerValue
            });
            var _props = this.props,
                picker = _props.picker,
                pickerValueChangeProp = _props.pickerValueChangeProp;

            if (picker && picker.props[pickerValueChangeProp]) {
                picker.props[pickerValueChangeProp](pickerValue);
            }
        }
    },
    saveRef: function saveRef(picker) {
        this.picker = picker;
    },
    setVisibleState: function setVisibleState(visible) {
        this.setState({
            visible: visible
        });
        if (!visible) {
            this.setState({
                pickerValue: null
            });
        }
    },
    fireVisibleChange: function fireVisibleChange(visible) {
        if (this.state.visible !== visible) {
            if (!('visible' in this.props)) {
                this.setVisibleState(visible);
            }
            this.props.onVisibleChange(visible);
        }
    },
    getRender: function getRender() {
        var props = this.props;
        var children = props.children;
        if (!children) {
            return this.getModal();
        }
        var _props2 = this.props,
            WrapComponent = _props2.WrapComponent,
            disabled = _props2.disabled;

        var child = children;
        var newChildProps = {};
        if (!disabled) {
            newChildProps[props.triggerType] = this.onTriggerClick;
        }
        return _react2["default"].createElement(
            WrapComponent,
            { style: props.wrapStyle },
            _react2["default"].cloneElement(child, newChildProps),
            this.getModal()
        );
    },
    onTriggerClick: function onTriggerClick(e) {
        var child = this.props.children;
        var childProps = child.props || {};
        if (childProps[this.props.triggerType]) {
            childProps[this.props.triggerType](e);
        }
        this.fireVisibleChange(!this.state.visible);
    },
    onOk: function onOk() {
        this.props.onOk(this.picker && this.picker.getValue());
        this.fireVisibleChange(false);
    },
    getContent: function getContent() {
        if (this.props.picker) {
            var _React$cloneElement;

            return _react2["default"].cloneElement(this.props.picker, (_React$cloneElement = {}, _defineProperty(_React$cloneElement, this.props.pickerValueProp, this.state.pickerValue), _defineProperty(_React$cloneElement, this.props.pickerValueChangeProp, this.onPickerChange), _defineProperty(_React$cloneElement, 'ref', this.saveRef), _React$cloneElement));
        } else {
            return this.props.content;
        }
    },
    onDismiss: function onDismiss() {
        this.props.onDismiss();
        this.fireVisibleChange(false);
    },
    hide: function hide() {
        this.fireVisibleChange(false);
    }
};
module.exports = exports['default'];