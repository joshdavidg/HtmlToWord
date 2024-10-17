import { EditableRunStyle } from "../types/styleTypes";
import { parseParagraphStyles } from "./parseStyles";
import {
    Paragraph,
    TextRun,
} from "docx";

export const htmlToWord = (htmlStr: string): Paragraph[] => {
    const domParser = new DOMParser();
    const htmlDoc: Document = domParser.parseFromString(`<body>${htmlStr}</body>`, "text/html");
    const sections: Paragraph[] = [];
    const htmlElements: Element[] = [...htmlDoc.getElementsByTagName("body")[0].children];

    htmlElements.forEach((node: Element) => {
        if (["p"].includes(node.nodeName.toLocaleLowerCase())) {
            sections.push(
                new Paragraph({
                    children: getParagraphChildren(node),
                    spacing: {after: 0},
                    ...parseParagraphStyles(node.getAttribute("style")),
                })
            );
        }
    });

    return sections;
}

const getParagraphChildren = (pNode: Element): TextRun[] => {
    let children: TextRun[] = [];

    if (pNode.childElementCount === 0) {
        children.push(
            new TextRun({
                text: pNode.textContent
            })
        );
        return children;
    } 

    [...pNode.children].forEach((elem: Element) => { 
        children.push(parseInnerTags(elem));
    });

    return children;
}

const parseInnerTags = (node: Element): TextRun => {
    let innerElements: Element[];
    innerElements = recurseElements(node, innerElements);

    let runStyles: EditableRunStyle = {};

    innerElements.forEach((elm: Element) => {
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
                //parse styles of the span
                break;
        }
    });

    return new TextRun({
        text: innerElements.pop().textContent,
        ...runStyles
    })
}

const recurseElements = (node: Element, elemArr: Element[]) => {
    if(node) elemArr.push(node);

    if (node.childElementCount === 0) {
        return elemArr;
    }
    if (node.tagName.toLocaleLowerCase() === "span" && !node.hasAttribute("style")) { //Regular span
        elemArr.pop()
        return elemArr;
    }

    return recurseElements(node.firstElementChild, elemArr);
}