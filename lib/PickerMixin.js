'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* tslint:disable:no-console */
exports["default"] = {
    select: function select(value) {
        var children = this.toChildrenArray(this.props.children);
        for (var i = 0, len = children.length; i < len; i++) {
            if (this.getChildMember(children[i], 'value') === value) {
                this.selectByIndex(i);
                return;
            }
        }
        this.selectByIndex(0);
    },
    selectByIndex: function selectByIndex(index) {
        if (index < 0 || index >= this.toChildrenArray(this.props.children).length || !this.itemHeight) {
            return;
        }
        this.scrollTo(index * this.itemHeight);
    },
    doScrollingComplete: function doScrollingComplete(top) {
        var index = top / this.itemHeight;
        var floor = Math.floor(index);
        if (index - floor > 0.5) {
            index = floor + 1;
        } else {
            index = floor;
        }
        var children = this.toChildrenArray(this.props.children);
        index = Math.min(index, children.length - 1);
        var child = children[index];
        if (child) {
            this.fireValueChange(this.getChildMember(child, 'value'));
        } else if (console.warn) {
            console.warn('child not found', children, index);
        }
    }
};
module.exports = exports['default'];