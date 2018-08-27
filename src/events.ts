export interface EventWithPath extends Event {
    path?: EventTarget[];
    composedPath?: () => EventTarget[];
}

/**
 * Checks if the event has a path or composedPath property.
 */
export const isEventWithPath = (event: Event): event is EventWithPath => {
    return (
        (event as EventWithPath).path !== undefined ||
        (event as EventWithPath).composedPath !== undefined
    );
};

/**
 * Gets the event path for the passed event.
 */
export const getEventPath = (event: Event) => {
    const polyfill = () => {
        let element = event.target as Node;
        const pathArr = new Array(element);

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
