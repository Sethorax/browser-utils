export const getScrollTop = (target: Window | Document | Element) => {
    if (target instanceof Element) {
        return target.scrollTop;
    }

    return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
};
