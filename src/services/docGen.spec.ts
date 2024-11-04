import { TextRun } from "docx";
import { describe, expect } from "vitest";
import { parseElementsTests } from "../../test_utilities/html-tester";
import { getParagraphChildren } from "./docGen";

describe("#getParagraphChildren", () => {
    parseElementsTests('Get children of a paragraph with no children should return array of 1 textrun object', ({ ParagraphNoDepth }) => {
        const textRuns: TextRun[] = getParagraphChildren(ParagraphNoDepth);

        expect(textRuns.length).toBe(1);
    })

    parseElementsTests('Get children of a paragraph with one span should return array of 2 textrun objects', ({ ParagraphSingleDepthWithSpan }) => {
        const textRuns: TextRun[] = getParagraphChildren(ParagraphSingleDepthWithSpan);

        expect(textRuns.length).toBe(2);
    })

    parseElementsTests('Get children of a paragraph with em tag with embedded tags should return array of 3 textrun object', ({ ParagraphMultiDepthWithSpanStrongEm }) => {
        const textRuns: TextRun[] = getParagraphChildren(ParagraphMultiDepthWithSpanStrongEm);

        expect(textRuns.length).toBe(3);
    })
})