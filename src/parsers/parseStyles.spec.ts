import { describe, expect } from "vitest";
import { parseStylesTests } from "../../test_utilities/html-tester";
import { parseInnerTagStyles, parseParagraphStyles, parseSpanStyles } from "./parseStyles";
import { IParagraphStylePropertiesOptions, IRunPropertiesOptions } from "docx";

describe("#parseParagraphStyles", () => {
    parseStylesTests("No style on paragraph should return default ParagraphOptions object", ({NoStyle}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(NoStyle);
        const expected: IParagraphStylePropertiesOptions = {};

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("unsupported style on single span should return default ParagraphOptions object", ({MarginRight}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(MarginRight);
        const expected: IParagraphStylePropertiesOptions = {};

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("text align center on paragraph should return ParagraphOptions with alignment center", ({TextAlignCenter}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(TextAlignCenter);
        const expected: IParagraphStylePropertiesOptions = { alignment: "center" }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("text align right on paragraph should return ParagraphOptions with alignment right", ({TextAlignRight}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(TextAlignRight);
        const expected: IParagraphStylePropertiesOptions = { alignment: "right" }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("text align left on paragraph should return ParagraphOptions with alignment left", ({TextAlignLeft}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(TextAlignLeft);
        const expected: IParagraphStylePropertiesOptions = { alignment: "left" }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("text align justified on paragraph should return ParagraphOptions with alignment both", ({TextAlignJustified}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(TextAlignJustified);
        const expected: IParagraphStylePropertiesOptions = { alignment: "both" }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("invalid text align on paragraph should return ParagraphOptions with alignment left", ({TextAlignNotValid}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(TextAlignNotValid);
        const expected: IParagraphStylePropertiesOptions = { alignment: "left" }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("left margin 10px style on paragraph should return ParagraphOptions with spacing before of 10", ({MarginLeft10px}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(MarginLeft10px);
        const expected: IParagraphStylePropertiesOptions = { spacing: {before: 10} }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })

    parseStylesTests("left margin 10px and text align justified style on paragraph should return ParagraphOptions with spacing before of 10 and alignment both", ({TextAlignJustifiedMarginLeft10px}) => {
        const paragraphOptions: IParagraphStylePropertiesOptions = parseParagraphStyles(TextAlignJustifiedMarginLeft10px);
        const expected: IParagraphStylePropertiesOptions = { alignment: "both", spacing: {before: 10} }

        expect.soft(paragraphOptions).toMatchObject(expected);
    })
})

describe("#parseInnerTagStyles", () => {
    parseStylesTests("element list with no style span will return RunOptions with empty options", ({ElementListWithSpanNoStyle}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithSpanNoStyle);
        const expected: IRunPropertiesOptions = {};

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with strong tag will return RunOptions with bold set to true", ({ElementListWithStrongTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithStrongTag);
        const expected: IRunPropertiesOptions = { bold: true };

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with u tag will return RunOptions with underline set to empty object (basic underline)", ({ElementListWithUTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithUTag);
        const expected: IRunPropertiesOptions = { underline: {} };

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with em tag will return RunOptions with italics set to true", ({ElementListWithEmTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithEmTag);
        const expected: IRunPropertiesOptions = { italics: true }

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with s tag will return RunOptions with strike set to true", ({ElementListWithSTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithSTag);
        const expected: IRunPropertiesOptions = { strike: true }

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with sup tag will return RunOptions with superscript set to true", ({ElementListWithSupTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithSupTag);
        const expected: IRunPropertiesOptions = { superScript: true }

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with sub tag will return RunOptions with subscript set to true", ({ElementListWithSubTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithSubTag);
        const expected: IRunPropertiesOptions = { subScript: true }

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with sub tag will return RunOptions with superscript, bold, and italics set to true", ({ElementListWithSupStrongEmTags}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithSupStrongEmTags);
        const expected: IRunPropertiesOptions = { superScript: true, bold: true, italics: true }

        expect.soft(innerOptions).toMatchObject(expected);
    })

    parseStylesTests("element list with styled span tag color red will return RunOptions with color set to red", ({ElementListWithSpanStyledTag}) => {
        const innerOptions: IRunPropertiesOptions = parseInnerTagStyles(ElementListWithSpanStyledTag);
        const expected: IRunPropertiesOptions = { color: "red" }

        expect.soft(innerOptions).toMatchObject(expected);
    })
})

describe("#parseSpanStyles", () => {
    parseStylesTests("background color yellow will return RunOptions with highlight set to yellow", ({BackgroundColor}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(BackgroundColor);
        const expected: IRunPropertiesOptions = { highlight: "yellow" };

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("font color #8e44ad will return RunOptions with color set to 8e44ad", ({FontColor}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(FontColor);
        const expected: IRunPropertiesOptions = { color: "8e44ad" };

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("font size 14px will return RunOptions with size set to 20", ({FontSizePx}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(FontSizePx);
        const expected: IRunPropertiesOptions = { size: 21 };

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("font size 11pt will return RunOptions with size set to 22", ({FontSizePt}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(FontSizePt);
        const expected: IRunPropertiesOptions = { size: 22 };

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("font size 10% unsupported and will return RunOptions with size set to 22", ({FontSizePercent}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(FontSizePercent);
        const expected: IRunPropertiesOptions = { size: 22 };

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("font family calibri will return RunOptions with font set to calibri", ({FontFamily}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(FontFamily);
        const expected: IRunPropertiesOptions = { font: "calibri" };

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("font weight unsupported and will return empty RunOptions", ({FontWeight}) => {
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(FontWeight);
        const expected: IRunPropertiesOptions = {};

        expect.soft(spanOptions).toMatchObject(expected);
    })

    parseStylesTests("style string with font size 11pt, font family calibri, and font color #8e44ad will return RunOptions with size set to 22, color set to 8e44ad, and font set to calibri", ({FontSizePt, FontFamily, FontColor}) => {
        const styleString: string = `${FontSizePt}, ${FontColor}, ${FontFamily}`;
        const spanOptions: IRunPropertiesOptions = parseSpanStyles(styleString);
        const expected: IRunPropertiesOptions = { size: 22, font: "calibri", color: "8e44ad" };

        expect.soft(spanOptions).toMatchObject(expected);
    })
})