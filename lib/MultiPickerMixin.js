'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = {
    getDefaultProps: function getDefaultProps() {
        return {
            prefixCls: 'rmc-multi-picker',
            pickerPrefixCls: 'rmc-picker',
            onValueChange: function onValueChange() {},

            disabled: false
        };
    },
    getValue: function getValue() {
        var _props = this.props,
            children = _props.children,
            selectedValue = _props.selectedValue;

        if (selectedValue && selectedValue.length) {
            return selectedValue;
        } else {
            if (!children) {
                return [];
            }
            return children.map(function (c) {
                var cc = c.props.children;
                return cc && cc[0] && cc[0].value;
            });
        }
    },
    onValueChange: function onValueChange(i, v) {
        var value = this.getValue().concat();
        value[i] = v;
        this.props.onValueChange(value, i);
    }
};
module.exports = exports['default'];