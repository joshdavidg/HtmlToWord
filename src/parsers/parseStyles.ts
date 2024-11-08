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
                if (elm.hasAttribute("style")) {
                    runStyles = {...parseSpanStyles(elm.getAttribute("style")), ...runStyles};
                }
                break;
        }
    });

    return runStyles as IRunPropertiesOptions;
}

export const parseSpanStyles = (styles: string): IRunPropertiesOptions => {
    let styleOptions: EditableRunStyle = {};
    if(styles) {
        const allStyles: string[] = styles.split(',');
        for (const style of allStyles) {
            const [keyword, value] = style.split(':');
            switch(keyword.toLowerCase().trim()) {
                case "background-color":
                    styleOptions.highlight = value.trim().replace("#", "");
                    break;
                case "color": 
                    styleOptions.color = value.trim().replace("#", "");
                    break;
                case "font-size":
                    styleOptions.size = value.trim().includes("px") ? (+value.trim().replace("px", "") * (72 / 96)) * 2
                        : value.trim().includes("pt") ? +value.trim().replace("pt", "") * 2
                            : 22;
                    break;
                case "font-family":
                    styleOptions.font = value.trim();
                    break;
                default:
                    break;
            }
        }
        return styleOptions as IRunPropertiesOptions;
    }
}