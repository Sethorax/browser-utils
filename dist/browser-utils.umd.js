(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.browserUtils = {})));
}(this, (function (exports) { 'use strict';

    /**
     * Converts a NodeList or HTMLCollection to a plain Array.
     */
    var listToArray = function (list) {
        var nodes = new Array();
        Array.prototype.forEach.call(list, function (item) {
            nodes.push(item);
        });
        return nodes;
    };
    /**
     * Returns true if the element matches the given selector string.
     */
    var elementMatches = function (element, selector) {
        return ((element.matches && element.matches(selector)) ||
            (element.webkitMatchesSelector &&
                element.webkitMatchesSelector(selector)) ||
            (element.msMatchesSelector && element.msMatchesSelector(selector)) ||
            false);
    };

    /**
     * Checks if the event has a path or composedPath property.
     */
    var isEventWithPath = function (event) {
        return (event.path !== undefined ||
            event.composedPath !== undefined);
    };
    /**
     * Gets the event path for the passed event.
     */
    var getEventPath = function (event) {
        var polyfill = function () {
            var element = event.target;
            var pathArr = new Array(element);
            if (!element || !element.parentElement) {
                return [];
            }
            while (element.parentElement !== null) {
                element = element.parentElement;
                pathArr.unshift(element);
            }
            return pathArr;
        };
        return isEventWithPath(event)
            ? event.path || event.composedPath()
            : polyfill();
    };

    var getScrollTop = function (target) {
        if (target instanceof Element) {
            return target.scrollTop;
        }
        return (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0);
    };

    exports.listToArray = listToArray;
    exports.elementMatches = elementMatches;
    exports.isEventWithPath = isEventWithPath;
    exports.getEventPath = getEventPath;
    exports.getScrollTop = getScrollTop;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
