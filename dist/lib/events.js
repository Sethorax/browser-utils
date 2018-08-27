"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the event has a path or composedPath property.
 */
exports.isEventWithPath = function (event) {
    return (event.path !== undefined ||
        event.composedPath !== undefined);
};
/**
 * Gets the event path for the passed event.
 */
exports.getEventPath = function (event) {
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
    return exports.isEventWithPath(event)
        ? event.path || event.composedPath()
        : polyfill();
};
