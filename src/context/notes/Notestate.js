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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5Mzg5ZmExNGM4YTVkZmU1ZTRiMDczIn0sImlhdCI6MTc1NDQ5OTYyOX0.84Ipb_8FNwMeD5NgB7SW3o4F3hWchdA6wulW5-EtyD8",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5Mzg5ZmExNGM4YTVkZmU1ZTRiMDczIn0sImlhdCI6MTc1NDQ5OTYyOX0.84Ipb_8FNwMeD5NgB7SW3o4F3hWchdA6wulW5-EtyD8",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5Mzg5ZmExNGM4YTVkZmU1ZTRiMDczIn0sImlhdCI6MTc1NDQ5OTYyOX0.84Ipb_8FNwMeD5NgB7SW3o4F3hWchdA6wulW5-EtyD8",
      },

    });

    const json = response.json()
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5Mzg5ZmExNGM4YTVkZmU1ZTRiMDczIn0sImlhdCI6MTc1NDQ5OTYyOX0.84Ipb_8FNwMeD5NgB7SW3o4F3hWchdA6wulW5-EtyD8",
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

  return (
    <noteContext.Provider
      value={{ note, setNote, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
