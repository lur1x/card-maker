import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from '../setSelection.ts'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
}