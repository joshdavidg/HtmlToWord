import { expect, describe, it } from 'vitest';
import { wordPatchRequestSchema } from './word-patch-request';
import { z } from 'zod';

describe("wordPatchRequestSchema", () => {
   
    it("should parse valid request using patch data", () => {
        const validRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": { 
                    type: "text", 
                    data: "test data" 
                } 
            }
        };

        const parsedRequest = wordPatchRequestSchema.parse(validRequest);

        expect(parsedRequest).toEqual(validRequest);
    })

    it("should parse valid request using 'text' for type property in PatchData", () => {
        const validRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": { 
                    type: "text", 
                    data: "test data" 
                }
            }
        };

        const parsedRequest = wordPatchRequestSchema.parse(validRequest);

        expect(parsedRequest).toEqual(validRequest);
    })

    it("should parse valid request using 'html' for type property in PatchData", () => {
        const validRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": { 
                    type: "html", 
                    data: "test data" 
                }
            }
        };

        const parsedRequest = wordPatchRequestSchema.parse(validRequest);

        expect(parsedRequest).toEqual(validRequest);
    })

    it("should parse valid request using valid encoded property", () => {
        const validRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": { 
                    type: "text", 
                    encode: "b64",
                    data: "test data" 
                }
            }
        };

        const parsedRequest = wordPatchRequestSchema.parse(validRequest);

        expect(parsedRequest).toEqual(validRequest);
    })

    it("should parse valid request using string", () => {
        const validRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": "test data"
            }
        };

        const parsedRequest = wordPatchRequestSchema.parse(validRequest);

        expect(parsedRequest).toEqual(validRequest);
    })
    
    it("should throw zod error for missing patchDocument", () => {
        const invalidRequest = {
            patchData: { 
                "test": "test data"
            }
        };

        const parsedRequest = wordPatchRequestSchema.safeParse(invalidRequest);

        expect(parsedRequest.success).toBe(false);;
        if(!parsedRequest.success) {
            expect(parsedRequest.error).toBeInstanceOf(z.ZodError);
            expect(parsedRequest.error?.errors[0].message).toBe("required for word patcher");
        }
    })

    it("should throw zod error for invalid patch data record value type", () => {
        const invalidRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": 23
            }
        };

        const parsedRequest = wordPatchRequestSchema.safeParse(invalidRequest);

        expect(parsedRequest.success).toBe(false);;
        if(!parsedRequest.success) {
            expect(parsedRequest.error).toBeInstanceOf(z.ZodError);
            expect(parsedRequest.error?.errors[0].message).toBe("Invalid input");
        }
    })

    it("should throw zod error for invalid patch data using none record type", () => {
        const invalidRequest = {
            patchDocument: "doc",
            patchData: "test"
        };

        const parsedRequest = wordPatchRequestSchema.safeParse(invalidRequest);

        expect(parsedRequest.success).toBe(false);;
        if(!parsedRequest.success) {
            expect(parsedRequest.error).toBeInstanceOf(z.ZodError);
            expect(parsedRequest.error?.errors[0].message).toBe("Expected object, received string");
        }
    })

    it("should throw zod error for invalid encode literal value", () => {
        const invalidRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": { 
                    type: "text", 
                    encode: "utf-8",
                    data: "test data" 
                }
            }
        };

        const parsedRequest = wordPatchRequestSchema.safeParse(invalidRequest);

        expect(parsedRequest.success).toBe(false);;
        if(!parsedRequest.success) {
            expect(parsedRequest.error).toBeInstanceOf(z.ZodError);
            expect(parsedRequest.error?.errors[0].message).toBe("Invalid input");
        }
    })
    
    it("should throw zod error for 'invalid' type in PatchData", () => {
        const invalidRequest = {
            patchDocument: "doc",
            patchData: { 
                "test": { 
                    type: "invalid", 
                    data: "test data" 
                }
            }
        };

        const parsedRequest = wordPatchRequestSchema.safeParse(invalidRequest);

        expect(parsedRequest.success).toBe(false);;
        if(!parsedRequest.success) {
            expect(parsedRequest.error).toBeInstanceOf(z.ZodError);
            expect(parsedRequest.error?.errors[0].message).toBe("Invalid input");
        }
    })

})
