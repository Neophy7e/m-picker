'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _PopupMixin = require('./PopupMixin');

var _PopupMixin2 = _interopRequireDefault(_PopupMixin);

var _rcTouchable = require('rc-touchable');

var _rcTouchable2 = _interopRequireDefault(_rcTouchable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopupPicker = _react2["default"].createClass({
  displayName: 'PopupPicker',

  mixins: [_PopupMixin2["default"]],
  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rmc-picker-popup',
      triggerType: 'onClick',
      WrapComponent: 'span'
    };
  },
  getModal: function getModal() {
    var props = this.props;
    if (!this.state.visible) {
      return null;
    }
    var prefixCls = props.prefixCls,
        secondHeader = props.secondHeader;

    return _react2["default"].createElement(
      _rcDialog2["default"],
      { prefixCls: '' + prefixCls, className: props.className || '', visible: true, closable: false, transitionName: props.transitionName || props.popupTransitionName, maskTransitionName: props.maskTransitionName, onClose: this.hide, style: props.style },
      _react2["default"].createElement(
        'div',
        null,
        _react2["default"].createElement(
          'div',
          { className: prefixCls + '-header' },
          _react2["default"].createElement(
            _rcTouchable2["default"],
            { activeClassName: prefixCls + '-item-active' },
            _react2["default"].createElement(
              'div',
              { className: prefixCls + '-item ' + prefixCls + '-header-left', onClick: this.onDismiss },
              props.dismissText
            )
          ),
          _react2["default"].createElement(
            'div',
            { className: prefixCls + '-item ' + prefixCls + '-title' },
            props.title
          ),
          _react2["default"].createElement(
            _rcTouchable2["default"],
            { activeClassName: prefixCls + '-item-active' },
            _react2["default"].createElement(
              'div',
              { className: prefixCls + '-item ' + prefixCls + '-header-right', onClick: this.onOk },
              props.okText
            )
          )
        ),
        secondHeader,
        this.getContent()
      )
    );
  },
  render: function render() {
    return this.getRender();
  }
});
exports["default"] = PopupPicker;
module.exports = exports['default'];