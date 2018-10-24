"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a NodeList or HTMLCollection to a plain Array.
 */
exports.listToArray = function (list) {
    var nodes = new Array();
    Array.prototype.forEach.call(list, function (item) {
        nodes.push(item);
    });
    return nodes;
};
/**
 * Returns true if the element matches the given selector string.
 */
exports.elementMatches = function (element, selector) {
    return ((element.matches && element.matches(selector)) ||
        (element.webkitMatchesSelector &&
            element.webkitMatchesSelector(selector)) ||
        (element.msMatchesSelector &&
            element.msMatchesSelector(selector)) ||
        false);
};
