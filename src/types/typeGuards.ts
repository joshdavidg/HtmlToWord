import { DerivedAlignmentType } from "./styleTypes";

// Type guard for converting text-align to paragraph alignment
export function isAlignmentOption(value: string): value is DerivedAlignmentType {
    return ["left", "right", "both", "center"].includes(value);
}