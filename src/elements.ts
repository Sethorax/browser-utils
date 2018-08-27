/**
 * Converts a NodeList or HTMLCollection to a plain Array.
 */
export const listToArray = <T>(list: NodeList | HTMLCollection): T[] => {
    const nodes = new Array<T>();

    Array.prototype.forEach.call(list, (item: T) => {
        nodes.push(item);
    });

    return nodes;
};

/**
 * Returns true if the element matches the given selector string.
 */
export const elementMatches = (element: HTMLElement, selector: string) => {
    return (
        (element.matches && element.matches(selector)) ||
        (element.webkitMatchesSelector &&
            element.webkitMatchesSelector(selector)) ||
        (element.msMatchesSelector && element.msMatchesSelector(selector)) ||
        false
    );
};
