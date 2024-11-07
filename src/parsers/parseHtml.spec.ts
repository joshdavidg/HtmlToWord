import { beforeAll, describe, expect, vi, afterEach } from 'vitest';
import { htmlTests, parseElementsTests } from '../../test_utilities/html-tester';
import { htmlStringToElementList, recurseElements } from './parseHtml';

describe("#htmlStringToElementList", () => {
    htmlTests('parse html string with one p tag and return element list with one element',  ({ HtmlJustParagraph }) => {
        const elements = htmlStringToElementList(HtmlJustParagraph);

        expect(elements).toHaveLength(1);
        expect(elements[0].nodeName.toLowerCase()).toBe("p");
    })

    htmlTests('parse html string with multiple p tag and return element list to match amount of p tags'), ({ HtmlThreeParagraphs }) => {
        const elements = htmlStringToElementList(HtmlThreeParagraphs);

        expect.soft(elements).toHaveLength(3);
        elements.every(elem => {
            expect.soft(elem.nodeName.toLowerCase()).toBe('p');
            return true;
        });
    }
})

describe("#recurseElements", () => {
    parseElementsTests('Parse paragraph with no inner tags should return single p element array', ({ ParagraphNoDepth }) => {
        let innerElements: Element[] = [];
        innerElements = recurseElements(ParagraphNoDepth, innerElements);

        expect.soft(innerElements.length).toBe(1);
        expect.soft(innerElements.pop().nodeName.toLowerCase()).toBe('p');
        expect.soft(innerElements.length).toBe(0);
    })

    parseElementsTests('Parse paragraph with single span inner tag should return two element array with span and p element', ({ ParagraphSingleDepthWithSpan }) => {
        let innerElements: Element[] = [];
        innerElements = recurseElements(ParagraphSingleDepthWithSpan, innerElements);

        expect.soft(innerElements.length).toBe(2);
        expect.soft(innerElements.pop().nodeName.toLowerCase()).toBe('span');
        expect.soft(innerElements.length).toBe(1);
        expect.soft(innerElements.pop().nodeName.toLowerCase()).toBe('p');
        expect.soft(innerElements.length).toBe(0);
    })

    parseElementsTests('Parse paragraph with multi depth including span, strong, em tag should return 4 element array', ({ ParagraphMultiDepthWithSpanStrongEm }) => {        
        let innerElements: Element[] = [];
        innerElements = recurseElements(ParagraphMultiDepthWithSpanStrongEm, innerElements);

        const elementsInOrder: string[] = ['p', 'em', 'strong', 'span'];

        expect(innerElements.length).toBe(4);
        while(innerElements.length > 0) {
            expect.soft(innerElements.pop().nodeName.toLowerCase()).toBe(elementsInOrder.pop().toLowerCase());
        }
    })
})