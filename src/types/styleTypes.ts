import { AlignmentType, IParagraphStylePropertiesOptions } from "docx";

// Remove readonly to allow for building typed object with type safety
export type EditableParagraphStyle = {
    -readonly [K in keyof IParagraphStylePropertiesOptions]: IParagraphStylePropertiesOptions[K];
};

// Create type from const AlignmentType object for typeguard
export type DerivedAlignmentType = (typeof AlignmentType)[keyof typeof AlignmentType]
