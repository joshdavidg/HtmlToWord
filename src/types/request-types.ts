export type PatchData = {
    type: 'html' | 'text',
    encoding?: 'b64',
    data: string,
}

export type PatchRequest = {
    patchDocument: string,
    patchData: Record<string, PatchData>
}