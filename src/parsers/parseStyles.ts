import { IParagraphStylePropertiesOptions, IRunPropertiesOptions } from "docx";
import { EditableParagraphStyle, EditableRunStyle } from "../types/styleTypes";
import { isAlignmentOption } from "../types/typeGuards";

export const parseParagraphStyles = (styles: string): IParagraphStylePropertiesOptions => {
    let styleOptions: EditableParagraphStyle = {};
    if(styles) {
        const allStyles: string[] = styles.split(',');
        for (const style of allStyles) {
            const [keyword, value] = style.split(':');
            switch (keyword.toLowerCase().trim()) {
                case "text-align":
                    const alignVal: string = value.toLowerCase().trim() === "justified" ? "both" : value.toLowerCase().trim();
                    styleOptions.alignment = isAlignmentOption(alignVal) ? alignVal : "left"
                    break;
                case "margin-left": 
                    styleOptions.spacing = {
                            before: +value.trim().replace("px", "")
                        };
                    break;
                default:
                    break;
            }
        }
        return styleOptions as IParagraphStylePropertiesOptions;
    }
}

export const parseInnerTagStyles = (nodes: Element[]): IRunPropertiesOptions => {
    let runStyles: EditableRunStyle = {};

    nodes.forEach((elm: Element) => {
        switch(elm.tagName.toLowerCase()) {
            case "strong": 
                runStyles.bold = true;
                break;
            case "u":
                runStyles.underline = {};
                break;
            case "em":
                runStyles.italics = true;
                break;
            case "s":
                runStyles.strike = true;
                break;
            case "sup":
                runStyles.superScript = true;
                break;
            case "sub":
                runStyles.subScript = true;
                break;
            case "span":
                //TODO: parse styles of the span
                break;
        }
    });

    return runStyles as IRunPropertiesOptions;
}