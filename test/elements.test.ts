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

describe("elements", () => {
    it("should convert NodeList to Array", () => {
        const list = jsdom.window.document.querySelectorAll("li");

        expect(list.length).toBe(3);

        const arr = BrowserUtils.listToArray<HTMLElement>(list);

        expect(arr.length).toBe(3);
    });

    it("should match elements by selector", () => {
        let list = jsdom.window.document.querySelectorAll("li");
        expect(list.length).toBe(3);

        expect(BrowserUtils.elementMatches(list[0], ".target")).toBeFalsy();
        expect(BrowserUtils.elementMatches(list[1], ".target")).toBeTruthy();
        expect(BrowserUtils.elementMatches(list[2], ".target")).toBeFalsy();

        let t = jsdom.window.document.querySelector(".target");
        (t as any).msMatchesSelector = t.matches;
        t.matches = undefined;

        expect(BrowserUtils.elementMatches(list[1], ".target")).toBeTruthy();
        expect(BrowserUtils.elementMatches(list[1], ".false")).toBeFalsy();

        t.webkitMatchesSelector = undefined;

        expect(BrowserUtils.elementMatches(list[1], ".target")).toBeTruthy();
        expect(BrowserUtils.elementMatches(list[1], ".false")).toBeFalsy();
    });
});
