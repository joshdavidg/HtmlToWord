import { test as base } from 'vitest';
import { htmlStringToElementList, recurseElements } from '../parsers';
import { PatchData } from '../types';

interface HtmlFixture {
    HtmlJustParagraph: string,
    HtmlSingleDepthWithSpan: string, 
    HtmlSingleDepthWithStrong: string,
    HtmlThreeParagraphs: string,
    HtmlH1: string, 
    HtmlH2: string, 
    HtmlH3: string, 
    HtmlUl: string, 
    HtmlOl: string, 
    HtmlA: string
}

export const htmlTests = base.extend<HtmlFixture>({
    HtmlJustParagraph: "<p>This is just a paragraph</p>",
    HtmlSingleDepthWithSpan: "<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>",
    HtmlSingleDepthWithStrong: "<p>This is a paragraph with <strong>Bold</strong> text</p>",
    HtmlThreeParagraphs: "<p>This is a paragraph</p><p>This is another paragraph</p><p>this is a third paragraph</p>",
    HtmlH1: '<h1>Heading 1</h1>',
    HtmlH2: '<h2>Heading 2</h2>',
    HtmlH3: '<h3>Heading 3</h3>',
    HtmlUl: '<ul><li>List Item 1</li></ul>',
    HtmlOl: '<ol><li>List Item 1</li></ol>',
    HtmlA: '<a href="google.com">google</a>'
});

interface parseElementsFixture {
    ParagraphNoDepth: Element | null,
    ParagraphSingleDepthWithSpan: Element | null,
    ParagraphMultiDepthWithSpanStrongEm: Element | null,
    UnorderListOneListItem: Element | null,
    OrderListOneListItem: Element | null,
    UnorderListOneListItemAndUnorderedListChild: Element | null
}

export const parseElementsTests = base.extend<parseElementsFixture>({
    ParagraphNoDepth: htmlStringToElementList("<p>This is a paragraph</p>").pop() ?? null,
    ParagraphSingleDepthWithSpan: htmlStringToElementList("<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>").pop() ?? null,
    ParagraphMultiDepthWithSpanStrongEm: htmlStringToElementList("<p>This text is <em><strong><span style='color:#8e44ad'>purple bold and italicized</span></strong></em> and also has other text</p>").pop() ?? null,
    UnorderListOneListItem: htmlStringToElementList("<ul><li>List Item 1</li></ul>").pop() ?? null,
    OrderListOneListItem: htmlStringToElementList("<ol><li>List Item 1</li></ol>").pop() ?? null,
    UnorderListOneListItemAndUnorderedListChild: htmlStringToElementList("<ul><li>List Item 1</li><ul><li>Inner List Item</li></ul></ul>").pop() ?? null,
})

interface parseStylesFixture {
    NoStyle: string,
    MarginRight: string,
    TextAlignCenter: string,
    TextAlignRight: string,
    TextAlignJustified: string,
    TextAlignLeft: string,
    TextAlignNotValid: string,
    MarginLeft10px: string,
    TextAlignJustifiedMarginLeft10px: string,
    BackgroundColor: string,
    FontColor: string,
    FontSizePx: string,
    FontSizePt: string,
    FontSizePercent: string, 
    FontFamily: string,
    FontWeight: string, 
    ElementListWithSpanNoStyle: Element[],
    ElementListWithStrongTag: Element[],
    ElementListWithUTag: Element[],
    ElementListWithEmTag: Element[],
    ElementListWithSTag: Element[],
    ElementListWithSupTag: Element[],
    ElementListWithSubTag: Element[],
    ElementListWithSpanStyledTag: Element[],
    ElementListWithSupStrongEmTags: Element[]
}

export const parseStylesTests = base.extend<parseStylesFixture>({
    NoStyle: "",
    MarginRight: "margin-right: 10px",
    TextAlignCenter: "text-align: center",
    TextAlignRight: "text-align: right",
    TextAlignLeft: "text-align: left",
    TextAlignJustified: "text-align: justified",
    TextAlignNotValid: "text-align: open",
    MarginLeft10px: "margin-left: 10px",
    TextAlignJustifiedMarginLeft10px: "text-align: justified, margin-left: 10px",
    ElementListWithSpanNoStyle: recurseElements(htmlStringToElementList("<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>").pop() ?? null, []).slice(1),
    ElementListWithStrongTag: recurseElements(htmlStringToElementList("<p>This is <strong>Bold</strong> text</p>").pop() ?? null, []).slice(1),
    ElementListWithUTag: recurseElements(htmlStringToElementList("<p>This is <u>Bold</u> text</p>").pop() ?? null, []).slice(1),
    ElementListWithEmTag: recurseElements(htmlStringToElementList("<p>This is <em>Bold</em> text</p>").pop() ?? null, []).slice(1),
    ElementListWithSTag: recurseElements(htmlStringToElementList("<p>This is <s>Bold</s> text</p>").pop() ?? null, []).slice(1),
    ElementListWithSupTag: recurseElements(htmlStringToElementList("<p>This is <sup>Bold</sup> text</p>").pop() ?? null, []).slice(1),
    ElementListWithSubTag: recurseElements(htmlStringToElementList("<p>This is <sub>Bold</sub> text</p>").pop() ?? null, []).slice(1),
    ElementListWithSpanStyledTag: recurseElements(htmlStringToElementList('<p>This is a paragraph with special characters that are put in a span: <span style="color:red">Trademark™</span></p>').pop() ?? null, []).slice(1),
    ElementListWithSupStrongEmTags: recurseElements(htmlStringToElementList("<p>This text is <em><strong><sup>purple bold and italicized</sup></strong></em> and also has other text</p>").pop() ?? null, []).slice(1),
    BackgroundColor: 'background-color:yellow',
    FontColor: 'color:#8e44ad',
    FontSizePx: 'font-size:14px',
    FontSizePt: 'font-size:11pt',
    FontSizePercent: 'font-size: 10%',
    FontFamily: 'font-family:calibri',
    FontWeight: 'font-weight: bold'
})

interface DocGenFixtures {
    PatchDataSingleItemTextNoEncoding: Record<string, PatchData>,
    PatchDataSingleItemTextB64: Record<string, PatchData>,
    PatchDataSingleItemHtmlNoEncoding: Record<string, PatchData>,
    PatchDataSingleItemHtmlB64: Record<string, PatchData>,
    PatchDataSingleItemUnsupportedType: Record<string, PatchData>,
}

export const docGenTests = base.extend<DocGenFixtures>({
    PatchDataSingleItemTextNoEncoding: { "unencoded-text": { type: "text", data: "Hello!" } },
    PatchDataSingleItemTextB64: { "encoded-text": { type: "text", data: "SGVsbG8h", encoding: "b64" } },
    PatchDataSingleItemHtmlNoEncoding: { "unencoded-html": { type: "html", data: "<p>Hello!</p>" } },
    PatchDataSingleItemHtmlB64: { "encoded-html": { type: "html", data: "PHA-SGVsbG8hPC9wPg", encoding: "b64" } },
    // @ts-expect-error
    PatchDataSingleItemUnsupportedType: { "encoded-html": { type: "", data: "PHA-SGVsbG8hPC9wPg", encoding: "b64" } }
}) 