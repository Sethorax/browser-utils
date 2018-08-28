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

export { listToArray, elementMatches, isEventWithPath, getEventPath };
