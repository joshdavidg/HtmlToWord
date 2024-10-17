import { IParagraphStylePropertiesOptions } from "docx";
import { EditableParagraphStyle } from "../types/styleTypes";
import { isAlignmentOption } from "../types/typeGuards";

export const parseParagraphStyles = (styles: string): IParagraphStylePropertiesOptions => {
    let styleOptions: EditableParagraphStyle = {};
    if(styles) {
        const allStyles: string[] = styles.split(',');
        for (const style of allStyles) {
            const [keyword, value] = style.split(':');
            switch (keyword) {
                case "text-align":
                    const alignVal: string = value.toLowerCase() === "justified" ? "both" : value;
                    styleOptions.alignment = isAlignmentOption(alignVal) ? alignVal : "left"
                    break;
                case "margin-left": 
                    styleOptions.spacing = {
                            before: +value.replace("px", "")
                        };
                    break;
                default:
                    break;
            }
        }
        return styleOptions;
    }
}