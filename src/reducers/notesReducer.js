import {createSlice} from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action){
            return state.concat(action.payload) //We send a single note or a list of notes as payload
        },
        toggleImportance(state, action){
            const id = action.payload; //we pass the note id as the payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {...noteToChange, important: !noteToChange.important}
            return state.map(n => n.id === id ? changedNote : n)
        }
    }
})

//Now dispatch(createNote(someNoteObj))
//will be the same as
// dispatch( {type: 'notes/createNote', payload: someNoteObj} )

// and

// dispatch(toggleImportance(id))
// will be same as
// dispatch({type: 'notes/toggleImportance', payload: id})

export const {createNote, toggleImportance} = notesSlice.actions
export default notesSlice.reducer