import { parseFromString } from "dom-parser";
import {
    IParagraphStylePropertiesOptions,
    AlignmentType,
    Paragraph,
    TextRun
} from "docx";

// Remove readonly to allow for building typed object with type safety
type EditableParagraphStyle = {
    -readonly [K in keyof IParagraphStylePropertiesOptions]: IParagraphStylePropertiesOptions[K];
};

// Create type from const AlignmentType object for typeguard
type DerivedAlignmentType = (typeof AlignmentType)[keyof typeof AlignmentType]

// Type guard for converting text-align to paragraph alignment
function isAlignmentOption(value: string): value is DerivedAlignmentType {
    return ["left", "right", "both", "center"].includes(value);
}

export const htmlToWord = (htmlStr: string): Paragraph[] => {
    const dom = parseFromString(`<body>${htmlStr}</body>`);
    const sections = [];

    dom.getElementsByTagName("body")[0].childNodes.forEach((node) => {
        if (["p"].includes(node.nodeName)) {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: node.textContent,
                        }),
                    ],
                    spacing: {after: 0},
                    ...parseParagraphStyles(node.getAttribute("style")),
                })
            );
        }
    });

    return sections;
}

const parseParagraphStyles = (styles: string): IParagraphStylePropertiesOptions => {
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