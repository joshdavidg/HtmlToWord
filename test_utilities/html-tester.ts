import { test as base } from 'vitest';
import { htmlStringToElementList, recurseElements } from '../src/parsers/parseHtml';

interface HtmlFixture {
    HtmlJustParagraph: string,
    HtmlSingleDepthWithSpan: string, 
    HtmlSingleDepthWithStrong: string,
    HtmlThreeParagraphs: string,
}

export const htmlTests = base.extend<HtmlFixture>({
    HtmlJustParagraph: "<p>This is just a paragraph</p>",
    HtmlSingleDepthWithSpan: "<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>",
    HtmlSingleDepthWithStrong: "<p>This is a paragraph with <strong>Bold</strong> text</p>",
    HtmlThreeParagraphs: "<p>This is a paragraph</p><p>This is another paragraph</p><p>this is a third paragraph</p>"
});

interface parseElementsFixture {
    ParagraphNoDepth: Element,
    ParagraphSingleDepthWithSpan: Element,
    ParagraphMultiDepthWithSpanStrongEm: Element
}

export const parseElementsTests = base.extend<parseElementsFixture>({
    ParagraphNoDepth: htmlStringToElementList("<p>This is a paragraph</p>").pop(),
    ParagraphSingleDepthWithSpan: htmlStringToElementList("<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>").pop(),
    ParagraphMultiDepthWithSpanStrongEm: htmlStringToElementList("<p>This text is <em><strong><span style='color:#8e44ad'>purple bold and italicized</span></strong></em> and also has other text</p>").pop()
})

interface parseStylesFixture {
    NoStyle: string,
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
    FontFamily: string,
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
    TextAlignCenter: "text-align: center",
    TextAlignRight: "text-align: right",
    TextAlignLeft: "text-align: left",
    TextAlignJustified: "text-align: justified",
    TextAlignNotValid: "text-align: open",
    MarginLeft10px: "margin-left: 10px",
    TextAlignJustifiedMarginLeft10px: "text-align: justified, margin-left: 10px",
    ElementListWithSpanNoStyle: recurseElements(htmlStringToElementList("<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>").pop(), []).slice(1),
    ElementListWithStrongTag: recurseElements(htmlStringToElementList("<p>This is <strong>Bold</strong> text</p>").pop(), []).slice(1),
    ElementListWithUTag: recurseElements(htmlStringToElementList("<p>This is <u>Bold</u> text</p>").pop(), []).slice(1),
    ElementListWithEmTag: recurseElements(htmlStringToElementList("<p>This is <em>Bold</em> text</p>").pop(), []).slice(1),
    ElementListWithSTag: recurseElements(htmlStringToElementList("<p>This is <s>Bold</s> text</p>").pop(), []).slice(1),
    ElementListWithSupTag: recurseElements(htmlStringToElementList("<p>This is <sup>Bold</sup> text</p>").pop(), []).slice(1),
    ElementListWithSubTag: recurseElements(htmlStringToElementList("<p>This is <sub>Bold</sub> text</p>").pop(), []).slice(1),
    ElementListWithSpanStyledTag: recurseElements(htmlStringToElementList('<p>This is a paragraph with special characters that are put in a span: <span style="color:red">Trademark™</span></p>').pop(), []).slice(1),
    ElementListWithSupStrongEmTags: recurseElements(htmlStringToElementList("<p>This text is <em><strong><sup>purple bold and italicized</sup></strong></em> and also has other text</p>").pop(), []).slice(1),
    BackgroundColor: 'background-color:yellow',
    FontColor: 'color:#8e44ad',
    FontSizePx: 'font-size:14px',
    FontSizePt: 'font-size:11pt',
    FontFamily: 'font-family:calibri'
})