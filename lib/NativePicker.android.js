'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _PickerMixin = require('./PickerMixin');

var _PickerMixin2 = _interopRequireDefault(_PickerMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ratio = _reactNative.PixelRatio.get();
var styles = _reactNative.StyleSheet.create({
    indicator: {
        position: 'absolute',
        left: 0,
        top: -99,
        borderColor: '#aaa',
        borderTopWidth: 1 / ratio,
        borderBottomWidth: 1 / ratio
    },
    scrollView: {
        height: 0
    },
    selectedItemText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000'
    },
    item: {
        height: 36
    },
    itemText: {
        fontSize: 20,
        color: '#aaa',
        textAlign: 'center'
    }
});
var Picker = _react2["default"].createClass({
    displayName: 'Picker',

    mixins: [_PickerMixin2["default"]],
    getDefaultProps: function getDefaultProps() {
        return {
            onValueChange: function onValueChange() {}
        };
    },
    onItemLayout: function onItemLayout(e) {
        var _this = this;

        var _e$nativeEvent$layout = e.nativeEvent.layout,
            height = _e$nativeEvent$layout.height,
            width = _e$nativeEvent$layout.width;
        // console.log('onItemLayout', height);

        if (this.itemHeight !== height || this.itemWidth !== width) {
            this.itemWidth = width;
            this.refs.indicator.setNativeProps({
                style: [styles.indicator, {
                    top: height * 3,
                    height: height,
                    width: width
                }]
            });
        }
        if (this.itemHeight !== height) {
            this.itemHeight = height;
            this.refs.scroller.setNativeProps({
                style: {
                    height: height * 7
                }
            });
            this.refs.content.setNativeProps({
                style: {
                    paddingTop: height * 3,
                    paddingBottom: height * 3
                }
            });
            // i do no know why!...
            setTimeout(function () {
                _this.select(_this.props.selectedValue);
            }, 0);
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        this.select(this.props.selectedValue);
    },
    componentWillUnMount: function componentWillUnMount() {
        this.clearScrollBuffer();
    },
    clearScrollBuffer: function clearScrollBuffer() {
        if (this.scrollBuffer) {
            clearTimeout(this.scrollBuffer);
        }
    },
    scrollTo: function scrollTo(y) {
        this.refs.scroller.scrollTo({
            y: y,
            animated: false
        });
    },
    fireValueChange: function fireValueChange(selectedValue) {
        if (this.props.selectedValue !== selectedValue) {
            this.props.onValueChange(selectedValue);
        }
    },
    onScroll: function onScroll(e) {
        var _this2 = this;

        var y = e.nativeEvent.contentOffset.y;

        this.clearScrollBuffer();
        this.scrollBuffer = setTimeout(function () {
            _this2.clearScrollBuffer();
            _this2.doScrollingComplete(y);
        }, 100);
    },
    getChildMember: function getChildMember(child, m) {
        return child.props[m];
    },
    toChildrenArray: function toChildrenArray(children) {
        return _react2["default"].Children.toArray(children);
    },
    render: function render() {
        var _this3 = this;

        var _props = this.props,
            children = _props.children,
            itemStyle = _props.itemStyle,
            selectedValue = _props.selectedValue,
            style = _props.style;

        var items = _react2["default"].Children.map(children, function (item, index) {
            var totalStyle = [itemStyle, styles.itemText];
            if (selectedValue === item.props.value) {
                totalStyle.push(styles.selectedItemText);
            }
            return _react2["default"].createElement(
                _reactNative.View,
                { style: styles.item, ref: 'item' + index, onLayout: index === 0 ? _this3.onItemLayout : undefined, key: item.key },
                _react2["default"].createElement(
                    _reactNative.Text,
                    { style: totalStyle },
                    item.props.label
                )
            );
        });
        return _react2["default"].createElement(
            _reactNative.View,
            { style: style },
            _react2["default"].createElement(
                _reactNative.ScrollView,
                { style: styles.scrollView, ref: 'scroller', onScroll: this.onScroll, scrollEventThrottle: 16, showsVerticalScrollIndicator: false },
                _react2["default"].createElement(
                    _reactNative.View,
                    { ref: 'content' },
                    items
                )
            ),
            _react2["default"].createElement(_reactNative.View, { ref: 'indicator', style: styles.indicator })
        );
    }
});
Picker.Item = function Item() {};
exports["default"] = Picker;
module.exports = exports['default'];