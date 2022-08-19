import {useEffect, useRef, useState} from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
import {createNoteAction, toggleImportanceAction} from "./reducers/notesReducer";
import {useDispatch, useSelector} from "react-redux";

const App = () => {
    console.log("App rendered!");
    // The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js.
    // This allows all components to make changes to the state of the redux-store.
    const dispatch = useDispatch();

    // The component can access the notes stored in the store with the useSelector-hook of the react-redux library.
    //TODO: Figure out how to work with multiple reducers/stores
    const notes = useSelector(state => state);
    console.log("Get the notes from store");

    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    //This is actually a reference to the Togglable instance that encloses
    // the NoteForm instance in our code. But we named it noteFormRef since a function present inside
    // Togglable will be used in the NoteForm instance
    const noteFormRef = useRef();

    const notesToShow = showAll ? notes : notes.filter(note => note.important);


    const hook = () => {
        console.log("setup initial notes on mount");
        const promise = noteService.getAll();
        promise.then(initialNotes => {
            // NOTE: calling dispatch(action) will cause a re-render
            dispatch(createNoteAction(initialNotes));
        });
    };

    //By default effects run after every completed render. But since we passed deps [],
    // this is the same as run hook only onMount.
    // Since [] never changes.
    useEffect(hook, [dispatch]);

    useEffect(() => {
        console.log("Setup user token on mount");
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility();
        noteService.create(noteObject)
            .then(returnedNote => {
                // setNotes(notes.concat(returnedNote));
                dispatch(createNoteAction(returnedNote));
            })
            .catch(error => {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000);
            });
    };

    const toggleImportanceOf = (id) => {
        // Update USING POST Request, not as good as PATCH IMO
        // const note = notes.find(note => note.id === id);
        dispatch(toggleImportanceAction(id));
        const changedNote = notes.find(note => note.id === id);
        noteService.update(id, changedNote)
            .then(returnedNote => {
                console.log(`note ${id} importance set to ${returnedNote.important}`);
            });
    };

    const handleLogin = async (event) => {
        event.preventDefault(); //Prevents the default action of submitting the form.
        //console.log(`logging in with ${username} and ${password}`);
        const credentials = {
            username: username,
            password: password
        };
        try {
            const user = await loginService.login(credentials);
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
            noteService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (e) {
            setErrorMessage('Invalid username or password');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    };

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedNoteappUser');
        setUser(null);
    }

    const loginForm = () => {
        return (
            <Togglable buttonLabel={'login'}>
                <LoginForm
                    handleSubmit={handleLogin}
                    username={username}
                    handleUsernameChange={({target}) => {
                        setUsername(target.value)
                    }}
                    password={password}
                    handlePasswordChange={({target}) => {
                        setPassword(target.value)
                    }}
                />
            </Togglable>
        )
    };

    const noteForm = () => {
        return (
            <Togglable buttonLabel={'new note'} ref={noteFormRef}>
                <NoteForm
                    createNote={addNote}
                />
            </Togglable>
        );
    }

    return (
        <>
            <h1>Notes Redux</h1>
            <Notification message={errorMessage}/>
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
                    <div>
                        <button onClick={() => {
                            setShowAll(!showAll)
                        }}>
                            show {showAll ? 'important' : 'all'}
                        </button>
                    </div>
                    <ul>
                        {notesToShow.map(note =>
                            <Note
                                key={note.id}
                                note={note}
                                toggleImportance={() => {
                                    toggleImportanceOf(note.id)
                                }}
                            />
                        )}
                    </ul>
                </div>
            }
        </>);
};

export default App;
