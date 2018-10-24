import { JSDOM } from "jsdom";
import * as BrowserUtils from "../src/browser-utils";

const jsdom = new JSDOM(`
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

document = jsdom.window.document;

describe("events", () => {
    it("should check if event has path", () => {
        const t = jsdom.window.document.querySelector(".target");

        const evt = new jsdom.window.Event("click");

        (evt as any).path = undefined;
        (evt as any).composedPath = undefined;

        expect(BrowserUtils.isEventWithPath(evt)).toBeFalsy();

        (evt as any).path = [];

        expect(BrowserUtils.isEventWithPath(evt)).toBeTruthy();

        (evt as any).path = undefined;
        (evt as any).composedPath = (): Array<any> => [];

        expect(BrowserUtils.isEventWithPath(evt)).toBeTruthy();

        (evt as any).path = [];

        expect(BrowserUtils.isEventWithPath(evt)).toBeTruthy();
    });

    it("should get event path without polyfill", () => {
        const fakePath = [
            jsdom.window.document.querySelector(".target"),
            jsdom.window.document.querySelector("ul"),
            document.body,
            document,
            window,
        ];

        const evt = new jsdom.window.Event("click");

        (evt as any).path = fakePath;

        expect(BrowserUtils.getEventPath(evt)).toBe(fakePath);

        (evt as any).path = undefined;
        (evt as any).composedPath = () => fakePath;

        expect(BrowserUtils.getEventPath(evt)).toBe(fakePath);
    });

    it("should get event path with polyfill", () => {
        const t = jsdom.window.document.querySelector(".target");

        t.addEventListener("click", event => {
            expect(BrowserUtils.getEventPath(event).length).toBe(4);
        });

        jsdom.window.addEventListener("click", event => {
            expect(BrowserUtils.getEventPath(event).length).toBe(1);
        });

        const evt = new jsdom.window.MouseEvent("click");

        (evt as any).path = undefined;
        (evt as any).composedPath = undefined;

        t.dispatchEvent(evt);

        const e = new jsdom.window.MouseEvent("click");
        jsdom.window.dispatchEvent(e);
    });
});
