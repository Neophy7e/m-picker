'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _zscroller = require('zscroller');

var _zscroller2 = _interopRequireDefault(_zscroller);

var _PickerMixin = require('./PickerMixin');

var _PickerMixin2 = _interopRequireDefault(_PickerMixin);

var _isChildrenEqual = require('./isChildrenEqual');

var _isChildrenEqual2 = _interopRequireDefault(_isChildrenEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Picker = _react2["default"].createClass({
    displayName: 'Picker',

    mixins: [_PickerMixin2["default"]],
    getDefaultProps: function getDefaultProps() {
        return {
            prefixCls: 'rmc-picker',
            pure: true,
            onValueChange: function onValueChange() {}
        };
    },
    getInitialState: function getInitialState() {
        var selectedValueState = void 0;
        var _props = this.props,
            selectedValue = _props.selectedValue,
            defaultSelectedValue = _props.defaultSelectedValue,
            children = _props.children;

        if (selectedValue !== undefined) {
            selectedValueState = selectedValue;
        } else if (defaultSelectedValue !== undefined) {
            selectedValueState = defaultSelectedValue;
        } else if (children && children.length) {
            selectedValueState = children[0].value;
        }
        return {
            selectedValue: selectedValueState
        };
    },
    componentDidMount: function componentDidMount() {
        this.itemHeight = this.refs.indicator.offsetHeight;
        // compact
        this.refs.content.style.padding = this.itemHeight * 3 + 'px 0';
        this.zscroller = new _zscroller2["default"](this.refs.content, {
            scrollingX: false,
            snapping: true,
            penetrationDeceleration: .1,
            minVelocityToKeepDecelerating: 0.5,
            scrollingComplete: this.scrollingComplete
        });
        this.zscroller.setDisabled(this.props.disabled);
        this.zscroller.scroller.setSnapSize(0, this.itemHeight);
        this.select(this.state.selectedValue);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if ('selectedValue' in nextProps) {
            this.setState({
                selectedValue: nextProps.selectedValue
            });
        }
        this.zscroller.setDisabled(nextProps.disabled);
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return this.state.selectedValue !== nextState.selectedValue || !(0, _isChildrenEqual2["default"])(this.props.children, nextProps.children, this.props.pure);
    },
    componentDidUpdate: function componentDidUpdate() {
        this.zscroller.reflow();
        this.select(this.state.selectedValue);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.zscroller.destroy();
    },
    scrollTo: function scrollTo(top) {
        this.zscroller.scroller.scrollTo(0, top);
    },
    fireValueChange: function fireValueChange(selectedValue) {
        if (selectedValue !== this.state.selectedValue) {
            if (!('selectedValue' in this.props)) {
                this.setState({
                    selectedValue: selectedValue
                });
            }
            this.props.onValueChange(selectedValue);
        }
    },
    scrollingComplete: function scrollingComplete() {
        var _zscroller$scroller$g = this.zscroller.scroller.getValues(),
            top = _zscroller$scroller$g.top;

        if (top >= 0) {
            this.doScrollingComplete(top);
        }
    },
    getChildMember: function getChildMember(child, m) {
        return child[m];
    },
    getValue: function getValue() {
        return this.props.selectedValue || this.props.children && this.props.children[0] && this.props.children[0].value;
    },
    toChildrenArray: function toChildrenArray(children) {
        return children;
    },
    render: function render() {
        var _pickerCls;

        var _props2 = this.props,
            children = _props2.children,
            prefixCls = _props2.prefixCls,
            className = _props2.className,
            itemStyle = _props2.itemStyle,
            indicatorStyle = _props2.indicatorStyle;
        var selectedValue = this.state.selectedValue;

        var itemClassName = prefixCls + '-item';
        var selectedItemClassName = itemClassName + ' ' + prefixCls + '-item-selected';
        var items = children.map(function (item) {
            return _react2["default"].createElement(
                'div',
                { style: itemStyle, className: selectedValue === item.value ? selectedItemClassName : itemClassName, key: item.value },
                item.label
            );
        });
        var pickerCls = (_pickerCls = {}, _defineProperty(_pickerCls, className, !!className), _defineProperty(_pickerCls, prefixCls, true), _pickerCls);
        return _react2["default"].createElement(
            'div',
            { className: (0, _classnames2["default"])(pickerCls) },
            _react2["default"].createElement('div', { className: prefixCls + '-mask' }),
            _react2["default"].createElement('div', { className: prefixCls + '-indicator', ref: 'indicator', style: indicatorStyle }),
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-content', ref: 'content' },
                items
            )
        );
    }
});
exports["default"] = Picker;
module.exports = exports['default'];