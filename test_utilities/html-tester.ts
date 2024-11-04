import { test as base } from 'vitest';
import { htmlStringToElementList } from '../src/parsers/parseHtml';

interface HtmlFixture {
    HtmlJustParagraph: string,
    HtmlSingleDepthWithSpan: string, 
    HtmlSingleDepthWithStrong: string,
    HtmlThreeParagraphs: string,
}

interface parseElementsFixture {
    ParagraphNoDepth: Element,
    ParagraphSingleDepthWithSpan: Element,
    ParagraphMultiDepthWithSpanStrongEm: Element
    ElementListMultiDepthWithPSpanStrongEm: Element[]
}

export const htmlTests = base.extend<HtmlFixture>({
    HtmlJustParagraph: "<p>This is just a paragraph</p>",
    HtmlSingleDepthWithSpan: "<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>",
    HtmlSingleDepthWithStrong: "<p>This is a paragraph with <strong>Bold</strong> text</p>",
    HtmlThreeParagraphs: "<p>This is a paragraph</p><p>This is another paragraph</p><p>this is a third paragraph</p>"
});

export const parseElementsTests = base.extend<parseElementsFixture>({
    ParagraphNoDepth: htmlStringToElementList("<p>This is a paragraph</p>").pop(),
    ParagraphSingleDepthWithSpan: htmlStringToElementList("<p>This is a paragraph with special characters that are put in a span: <span>Trademark™</span></p>").pop(),
    ParagraphMultiDepthWithSpanStrongEm: htmlStringToElementList("<p>This text is <em><strong><span style='color:#8e44ad'>purple bold and italicized</span></strong></em> and also has other text</p>").pop(),
    ElementListMultiDepthWithPSpanStrongEm: htmlStringToElementList("<p>This text is <em><strong><span style='color:#8e44ad'>purple bold and italicized</span></strong></em> and also has other text</p>")
})