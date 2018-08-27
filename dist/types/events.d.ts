export interface EventWithPath extends Event {
    path?: EventTarget[];
    composedPath?: () => EventTarget[];
}
/**
 * Checks if the event has a path or composedPath property.
 */
export declare const isEventWithPath: (event: Event) => event is EventWithPath;
/**
 * Gets the event path for the passed event.
 */
export declare const getEventPath: (event: Event) => EventTarget[];
