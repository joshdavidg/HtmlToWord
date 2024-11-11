import { ExternalHyperlink, HeadingLevel, Paragraph, TextRun } from "docx";
import { htmlStringToElementList, recurseElements } from "../parsers/parseHtml";
import { parseParagraphStyles, parseInnerTagStyles } from "../parsers/parseStyles";

export const htmlToWord = (htmlStr: string): Paragraph[] => {
    const sections: Paragraph[] = [];
    const htmlElements: Element[] = htmlStringToElementList(htmlStr);

    htmlElements.forEach((node: Element) => {
        switch(node.nodeName.toLocaleLowerCase()) {
            case "p":
                sections.push(
                    new Paragraph({
                        children: getParagraphChildren(node),
                        spacing: {after: 0},
                        ...parseParagraphStyles(node.getAttribute("style")),
                    })
                );
            break;
            case "h1": 
                sections.push(
                    new Paragraph({
                        text: node.textContent,
                        spacing: {after: 0},
                        heading: HeadingLevel.HEADING_1,
                        ...parseParagraphStyles(node.getAttribute("style")),
                    })
                );
            break;
            case "h2": 
                sections.push(
                    new Paragraph({
                        text: node.textContent,
                        spacing: {after: 0},
                        heading: HeadingLevel.HEADING_2,
                        ...parseParagraphStyles(node.getAttribute("style")),
                    })
                );
            break;
            case "h3":
                sections.push(
                    new Paragraph({
                        text: node.textContent,
                        spacing: {after: 0},
                        heading: HeadingLevel.HEADING_3,
                        ...parseParagraphStyles(node.getAttribute("style")),
                    })
                );
            break;
            case "ul":
                sections.push(...createList(node));
            break;
            case "ol":
                sections.push(...createList(node));
            break;
            case "a":
                sections.push(
                    new Paragraph({
                        children: [
                            new ExternalHyperlink({
                                children: [new TextRun({ text: node.textContent, style: "Hyperlink:" })],
                                link: node.getAttribute("href")
                            }),
                        ],
                    }),
                );
            break;
        }
    });

    return sections;
}

export const createList = (lNode: Element, level: number = 0): Paragraph[] => {
    let listItems: Paragraph[] = [];

    Array.from(lNode.children).forEach((elm: Element) => { 
        if (elm.nodeName === "ul" || elm.nodeName === "ol") {
            listItems.push(...createList(elm, level + 1));
        } else if (elm.nodeName === "li") {
            if (lNode.nodeName === "ul") {
                listItems.push(
                    new Paragraph({
                        spacing: {after: 0},
                        bullet: { level: level },
                        children: getParagraphChildren(elm)
                    })
                );
            } else {
                listItems.push(
                    new Paragraph({
                        spacing: {after: 0, before: 12 * level},
                        children: getParagraphChildren(elm),
                    })
                );
            }
        }
    });
    return listItems;
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
