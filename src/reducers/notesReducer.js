const notesReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return state.concat(action.data);
        case 'TOGGLE_IMPORTANCE':
            const id = action.data.id;
            const noteToChange = state.find(n => n.id === id);
            const changedNote = {...noteToChange, important: !noteToChange.important};
            return state.map(note => (note.id === changedNote.id) ? changedNote : note);
        case 'GET_NOTE':
            break;
        default:
            return state;
    }
}

export const createNoteAction = (note) => {
    return {
        type: 'NEW_NOTE',
        data: note
    };
}

export const toggleImportanceAction = (id) => {
    return{
        type: 'TOGGLE_IMPORTANCE',
        data: {id : id}
    };
}

export default notesReducer;