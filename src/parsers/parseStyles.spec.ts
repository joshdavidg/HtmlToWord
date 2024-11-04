import { describe, expect } from "vitest";
import { parseElementsTests } from "../../test_utilities/html-tester";

describe("#parseInnerTagStyles", () => {
    parseElementsTests('Parse inner tags with multi depth including span, strong, em tag and return styles matching tags', ({ ElementListMultiDepthWithPSpanStrongEm }) => {
        //TODO: Implement tests
        expect(true).toBe(true);
    })
})