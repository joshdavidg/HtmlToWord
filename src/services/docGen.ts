import { Paragraph, TextRun } from "docx";
import { htmlStringToElementList, recurseElements } from "../parsers/parseHtml";
import { parseParagraphStyles, parseInnerTagStyles } from "../parsers/parseStyles";

export const htmlToWord = (htmlStr: string): Paragraph[] => {
    const sections: Paragraph[] = [];
    const htmlElements: Element[] = htmlStringToElementList(htmlStr);

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

export const getParagraphChildren = (pNode: Element): TextRun[] => {
    let children: TextRun[] = [];

    if (pNode.childElementCount === 0) {
        children.push(
            new TextRun({
                text: pNode.textContent
            })
        );
        return children;
    } 

    pNode.childNodes.forEach((node: Node) => {
        if (node.nodeType === 3) { //Node.TEXT_NODE
            children.push(
                new TextRun({
                    text: node.textContent
                })
            );
        }
        if (node.nodeType === 1) { //Node.ELEMENT_NODE
            let innerElements: Element[] = [];
            innerElements = recurseElements(node as Element, innerElements);
            children.push(
                new TextRun({
                    text: node.textContent,
                    ...parseInnerTagStyles(innerElements)
                })
            )
        }
    });

    return children;
}