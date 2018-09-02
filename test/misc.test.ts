import { JSDOM } from "jsdom";
import * as BrowserUtils from "../src/browser-utils";

new JSDOM(`
<!doctype html>
<html>
<body>
    <ul>
        <li></li>
        <li class="target"></li>
        <li></li>
    </ul>
</body>
</html>
`);

describe("misc", () => {
    it("should get scrollTop of document and window", () => {
        expect(BrowserUtils.getScrollTop(document)).toBe(0);
        expect(BrowserUtils.getScrollTop(window)).toBe(0);
    });

    it("should get scrollTop of document and window via pageYOffset", () => {
        Object.defineProperty(window, "pageYOffset", {
            value: 10,
        });

        expect(BrowserUtils.getScrollTop(document)).toBe(10);
        expect(BrowserUtils.getScrollTop(window)).toBe(10);
    });

    it("should get scrollTop of document and window via documentElement.scrollTop", () => {
        Object.defineProperty(window, "pageYOffset", {
            value: undefined,
            configurable: true,
        });

        Object.defineProperty(document.documentElement, "scrollTop", {
            value: 11,
            configurable: true,
        });

        expect(BrowserUtils.getScrollTop(document)).toBe(11);
        expect(BrowserUtils.getScrollTop(window)).toBe(11);
    });

    it("should get scrollTop of document and window via body.scrollTop", () => {
        Object.defineProperty(window, "pageYOffset", {
            value: undefined,
        });

        Object.defineProperty(document.documentElement, "scrollTop", {
            value: undefined,
        });

        Object.defineProperty(document.body, "scrollTop", {
            value: 12,
        });

        expect(BrowserUtils.getScrollTop(document)).toBe(12);
        expect(BrowserUtils.getScrollTop(window)).toBe(12);
    });

    it("should get scrollTop of an element", () => {
        const t = document.createElement("div");

        expect(BrowserUtils.getScrollTop(t)).toBe(0);

        Object.defineProperty(t, "scrollTop", {
            value: 20,
        });

        expect(BrowserUtils.getScrollTop(t)).toBe(20);
    });
});
