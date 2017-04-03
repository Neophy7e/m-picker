'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PopupMixin = require('./PopupMixin');

var _PopupMixin2 = _interopRequireDefault(_PopupMixin);

var _Modal = require('rc-dialog/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopupPicker = _react2["default"].createClass({
    displayName: 'PopupPicker',

    mixins: [_PopupMixin2["default"]],
    getDefaultProps: function getDefaultProps() {
        return {
            actionTextUnderlayColor: '#ddd',
            actionTextActiveOpacity: 1,
            triggerType: 'onPress',
            styles: {},
            WrapComponent: _reactNative.View
        };
    },
    getModal: function getModal() {
        var props = this.props;
        var styles = props.styles,
            title = props.title,
            okText = props.okText,
            dismissText = props.dismissText;

        var titleEl = typeof title === 'string' ? _react2["default"].createElement(
            _reactNative.Text,
            { style: [styles.title] },
            title
        ) : title;
        var okEl = typeof okText === 'string' ? _react2["default"].createElement(
            _reactNative.Text,
            { style: [styles.actionText] },
            okText
        ) : okText;
        var dismissEl = typeof dismissText === 'string' ? _react2["default"].createElement(
            _reactNative.Text,
            { style: [styles.actionText] },
            dismissText
        ) : dismissText;
        return _react2["default"].createElement(
            _Modal2["default"],
            { animationType: 'slide-up', wrapStyle: styles.modal, visible: this.state.visible, onClose: this.onDismiss },
            _react2["default"].createElement(
                _reactNative.View,
                { style: [styles.header] },
                _react2["default"].createElement(
                    _reactNative.TouchableHighlight,
                    { onPress: this.onDismiss, style: [styles.headerItem], activeOpacity: props.actionTextActiveOpacity, underlayColor: props.actionTextUnderlayColor },
                    dismissEl
                ),
                _react2["default"].createElement(
                    _reactNative.View,
                    { style: [styles.headerItem] },
                    titleEl
                ),
                _react2["default"].createElement(
                    _reactNative.TouchableHighlight,
                    { onPress: this.onOk, style: [styles.headerItem], activeOpacity: props.actionTextActiveOpacity, underlayColor: props.actionTextUnderlayColor },
                    okEl
                )
            ),
            this.getContent()
        );
    },
    render: function render() {
        return this.getRender();
    }
});
exports["default"] = PopupPicker;
module.exports = exports['default'];