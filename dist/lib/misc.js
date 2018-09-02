"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScrollTop = function (target) {
    if (target instanceof Element) {
        return target.scrollTop;
    }
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
