import { z } from "zod";

const patchDataTypeSchema = z.enum(['html', 'text'])

const patchDataSchema = z.object({
    type: patchDataTypeSchema,
    encode: z.literal('b64').optional(),
    data: z.string()
});

export const wordPatchRequestSchema = z.object({
    patchDocument: z.unknown().refine(
        (val) => val !== undefined,
        {
            message: "required for word patcher"
        }
    ),
    patchData: z.record(z.string(), z.union([patchDataSchema, z.string()]))
});
