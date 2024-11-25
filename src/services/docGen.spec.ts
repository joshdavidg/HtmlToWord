import { ExternalHyperlink, HeadingLevel, IPatch, Paragraph, PatchType, TextRun } from "docx";
import { describe, expect } from "vitest";
import { docGenTests, htmlTests, parseElementsTests } from "../test_utilities/html-tester";
import { createList, createPatches, getParagraphChildren, htmlToWord } from "./docGen";

describe('#htmlToWord', () => {
    htmlTests('Single paragraph element should return list with one paragraph item', ({HtmlJustParagraph}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlJustParagraph);
        const expected: Paragraph[] = [new Paragraph(
            {
                children: [new TextRun("This is just a paragraph")], 
                spacing: {after: 0}
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    htmlTests('Single header 1 element should return list with one paragraph item with corresponding heading level set', ({HtmlH1}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlH1);
        const expected: Paragraph[] = [new Paragraph(
            {
                text: "Heading 1", 
                spacing: {after: 0},
                heading: HeadingLevel.HEADING_1
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    htmlTests('Single header 2 element should return list with one paragraph item with corresponding heading level set', ({HtmlH2}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlH2);
        const expected: Paragraph[] = [new Paragraph(
            {
                text: "Heading 2", 
                spacing: {after: 0},
                heading: HeadingLevel.HEADING_2
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    htmlTests('Single header 3 element should return list with one paragraph item with corresponding heading level set', ({HtmlH3}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlH3);
        const expected: Paragraph[] = [new Paragraph(
            {
                text: "Heading 3", 
                spacing: {after: 0},
                heading: HeadingLevel.HEADING_3
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    htmlTests('Unordered list element with one list item should return list with one paragraph list item', ({HtmlUl}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlUl);
        const expected: Paragraph[] = [new Paragraph(
            {
                spacing: {after: 0},
                bullet: { level: 0 },
                children: [new TextRun("List Item 1")]
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    htmlTests('Ordered list element with one list item should return list with one paragraph list item', ({HtmlOl}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlOl);
        const expected: Paragraph[] = [new Paragraph(
            {
                spacing: {after: 0, before: 0},
                children: [new TextRun("List Item 1")]
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    htmlTests('Link element with should return list with paragraph with a link', ({HtmlA}) => {
        const paragraphList: Paragraph[] = htmlToWord(HtmlA);
        const expected: Paragraph[] = [new Paragraph(
            {
                children: [
                    new ExternalHyperlink({
                        children: [new TextRun({ text: "google", style: "Hyperlink:" })],
                        link: "google.com"
                    }),
                ]
            }
        )];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })
})

describe('#createList', () => {
    parseElementsTests('Create single item unorder list should return one paragraph list element', ({UnorderListOneListItem}) => {
        const paragraphList: Paragraph[] = createList(UnorderListOneListItem);
        const expected: Paragraph[] = [new Paragraph({
            spacing: {after: 0},
            bullet: {level: 0},
            children: [new TextRun("List Item 1")]
        })];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    parseElementsTests('Create single item ordered list should return one paragraph list element', ({OrderListOneListItem}) => {
        const paragraphList: Paragraph[] = createList(OrderListOneListItem);
        const expected: Paragraph[] = [new Paragraph({
            spacing: {after: 0, before: 0},
            children: [new TextRun("List Item 1")]
        })];

        expect.soft(paragraphList.length).toBe(1);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })

    parseElementsTests('Create two item unordered list should return two item multi-level paragraph list', ({UnorderListOneListItemAndUnorderedListChild}) => {
        const paragraphList: Paragraph[] = createList(UnorderListOneListItemAndUnorderedListChild);
        const expected: Paragraph[] = [new Paragraph({
            spacing: {after: 0},
            bullet: {level: 0},
            children: [new TextRun("List Item 1")]
        }),
        new Paragraph({
            spacing: {after: 0},
            bullet: {level: 1},
            children: [new TextRun("Inner List Item")]
        })];

        expect.soft(paragraphList.length).toBe(2);
        expect.soft(JSON.stringify(paragraphList)).toBe(JSON.stringify(expected));
    })
})

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

describe("#createPatches", () => {
    docGenTests('Create patch list from list of one unencoded text patch data object', ({PatchDataSingleItemTextNoEncoding}) => {
        const patchObject: Record<string, IPatch> = createPatches(PatchDataSingleItemTextNoEncoding);
        const expected: Record<string, IPatch> = {
            "unencoded-text": { type: PatchType.PARAGRAPH, children: [new TextRun("Hello!")] }
        }
        
        expect.soft(Object.keys(patchObject).length).toBe(1);
        expect.soft(patchObject).toHaveProperty("unencoded-text");
        expect.soft(JSON.stringify(patchObject)).toBe(JSON.stringify(expected));
    })

    docGenTests('Create patch list from list of one b64 encoded text patch data object', ({PatchDataSingleItemTextB64}) => {
        const patchObject: Record<string, IPatch> = createPatches(PatchDataSingleItemTextB64);
        const expected: Record<string, IPatch> = {
            "encoded-text": { type: PatchType.PARAGRAPH, children: [new TextRun("Hello!")] }
        }
        
        expect.soft(Object.keys(patchObject).length).toBe(1);
        expect.soft(patchObject).toHaveProperty("encoded-text");
        expect.soft(JSON.stringify(patchObject)).toBe(JSON.stringify(expected));
    })

    docGenTests('Create patch list from list of one unencoded html patch data object', ({PatchDataSingleItemHtmlNoEncoding}) => {
        const patchObject: Record<string, IPatch> = createPatches(PatchDataSingleItemHtmlNoEncoding);
        const expected: Record<string, IPatch> = {
            "unencoded-html": { type: PatchType.DOCUMENT, children: [new Paragraph({
                children: [new TextRun({ text: "Hello!"})],
                spacing: {after: 0}
            })] }
        }
        
        expect.soft(Object.keys(patchObject).length).toBe(1);
        expect.soft(patchObject).toHaveProperty("unencoded-html");
        expect.soft(JSON.stringify(patchObject)).toBe(JSON.stringify(expected));
    })

    docGenTests('Create patch list from list of one b64 encoded html patch data object', ({PatchDataSingleItemHtmlB64}) => {
        const patchObject: Record<string, IPatch> = createPatches(PatchDataSingleItemHtmlB64);
        const expected: Record<string, IPatch> = {
            "encoded-html": { type: PatchType.DOCUMENT, children: [new Paragraph({
                children: [new TextRun({ text: "Hello!"})],
                spacing: {after: 0}
            })] }
        }
        
        expect.soft(Object.keys(patchObject).length).toBe(1);
        expect.soft(patchObject).toHaveProperty("encoded-html");
        expect.soft(JSON.stringify(patchObject)).toBe(JSON.stringify(expected));
    })

    docGenTests('Create patch list from list of one b64 encoded html patch data object with unsupported type', ({PatchDataSingleItemUnsupportedType}) => {
        const patchObject: Record<string, IPatch> = createPatches(PatchDataSingleItemUnsupportedType);
        const expected: Record<string, IPatch> = {};
        
        expect.soft(Object.keys(patchObject).length).toBe(0);
        expect.soft(JSON.stringify(patchObject)).toBe(JSON.stringify(expected));
    })
})