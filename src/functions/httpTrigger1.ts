import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { htmlToWord } from "../helpers/parseHtml";
import { Document, Packer } from "docx";

type jsonReq = {
    name: string,
    richTextHtml: string
}

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    //const name = request.query.get('name') || await request.text() || 'world';
    const body: jsonReq = await request.json() as jsonReq;
    const html = Buffer.from(body.richTextHtml, "base64");
    const doc = await Packer.toBuffer(await toDocx(html.toString('utf8')));

    return {body: doc};
};

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger1
});

const toDocx = async (str: string): Promise<Document> => {
    return new Document({
        creator: "me",
        sections: [
            {
                children: htmlToWord(str)
            }
        ]
    })
};