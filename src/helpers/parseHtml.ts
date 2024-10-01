import { parseFromString } from "dom-parser";
import {
    Document,
    IParagraphOptions,
    IParagraphPropertiesOptions,
    Paragraph,
    ParagraphProperties,
    TextRun
} from 'docx';

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
                    ...parseParagraphStyles(node.getAttribute('style')),
                })
            );
        }
    });

    return sections;
}

const parseParagraphStyles = (styles: string): IParagraphOptions => {
    let styleOptions: Object = {};
    if(styles) {
        const allStyles: string[] = styles.split(',');
        for (const style of allStyles) {
            const [keyword, value] = style.split(':');
            switch (keyword) {
                case "text-align":
                    styleOptions = {
                        alignment: value
                    }
                    break;
                case "margin-left": 
                    styleOptions = {
                        spacing: {
                            before: +value.replace("px", "")
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return styleOptions as IParagraphOptions;
    }
}