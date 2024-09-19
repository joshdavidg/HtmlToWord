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
    
    if(styles) {
        const allStyles: string[] = styles.split(',');
        let paragraphProps: IParagraphPropertiesOptions = {
            alignment: allStyles.includes('text-align:center') ? "center" : "left"
        };
        return paragraphProps;
    }
}