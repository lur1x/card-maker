import { Presentation } from "./PresentationTypes.ts";

export type SelectionType = {
    selectedSlideId: string | null,
    selectedObjectId: string | null,
}
export type EditorType = {
    presentation: Presentation,
    selection: SelectionType,
}