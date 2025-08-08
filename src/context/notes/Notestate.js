import { useState } from "react";
import noteContext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let notesInitial = [];
  const [note, setNote] = useState(notesInitial);

  // get all the notes
  const getNotes = async () => {
    //api call http://localhost:5000/api/notes/fetchallnotes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    setNote(json);
  };

  const addNote = async (title, description, tag) => {
    //api call http://localhost:5000/api/notes/savenote
    const response = await fetch(`${host}/api/notes/savenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    const noteNew = json
    // setNote([...note, noteNew]); // this is like push but immutable
    setNote(note.concat(noteNew))
  };
  const deleteNote = async(id) => {
    //api call

 const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

    });

    const json = await response.json()
    console.log(json)


    console.log(id);
    const newNotes = note.filter((eachnote) => {
      return eachnote._id !== id;
    });
    setNote(newNotes);
  };
  const editNote = async (id ,title,description,tag ) => {
    // api call /api/notes/updatenote

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),


    });

    // const json = response.json()
    // console.log(json)


    // for (let index = 0; index < note.length; index++) {
    //   const element = note[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }
  };

  const loginUser = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem("token",json.token)
      return true;
    }
    else{
            return false;

    }
  };
  const createUser = async (name , email, password) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name , email, password }),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem("token",json.token);
      return true;

    }

  };

  return (
    <noteContext.Provider
      value={{ note, setNote, addNote, deleteNote, editNote, getNotes , loginUser , createUser }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
