import { JSDOM } from "jsdom";

export const htmlStringToElementList = (htmlStr: string): Element[] => {
    const docString: string = htmlStr.includes('<body>') ? htmlStr : `<body>${htmlStr}</body>`;
    const dom: JSDOM = new JSDOM(docString);
    const htmlDoc: Document = dom.window.document;
    return [...htmlDoc.getElementsByTagName("body")[0].children] 
}

export const recurseElements = (node: Element | null, elemArr: Element[]): Element[] => {
    if(node) elemArr.push(node);

    if (node == null || node.childElementCount === 0) {
        return elemArr;
    }
    
    return recurseElements(node.firstElementChild, elemArr);
}