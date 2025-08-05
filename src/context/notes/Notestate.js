
import { useState } from "react";
import noteContext from "./Notecontext";

const NoteState = (props)=>{
let notesInitial = [
      {
    "_id": "6891266235f4b0aecfa75d5e",
    "user": "689125e935f4b0aecfa75d55",
    "title": "me hu jiyan",
    "description": "aajse kam khauga",
    "tag": "singer",
    "date": "2025-08-04T21:30:10.603Z",
    "__v": 0
  },
  {
    "_id": "689126bb35f4b0aecfa75d68",
    "user": "689125e935f4b0aecfa75d55",
    "title": "mthsvsvy",
    "description": "wthvswab",
    "tag": "this isvwes tag ",
    "date": "2025-08-04T21:31:39.510Z",
    "__v": 0
  },
  {
    "_id": "689126bb35f4b0aecfa75d68t",
    "user": "689125e935f4b0aecfa75d55",
    "title": "mthsvsvy",
    "description": "wthvswab",
    "tag": "this isvwes tag ",
    "date": "2025-08-04T21:31:39.510Z",
    "__v": 0
  },
  {
    "_id": "689126bb35f4b0aecfa75d68r",
    "user": "689125e935f4b0aecfa75d55",
    "title": "mthsvsvy",
    "description": "wthvswab",
    "tag": "this isvwes tag ",
    "date": "2025-08-04T21:31:39.510Z",
    "__v": 0
  },
  {
    "_id": "689126bb35f4b0aecfa75d68e",
    "user": "689125e935f4b0aecfa75d55",
    "title": "mthsvsvy",
    "description": "wthvswab",
    "tag": "this isvwes tag ",
    "date": "2025-08-04T21:31:39.510Z",
    "__v": 0
  },
  {
    "_id": "689126bb35f4b0aecfa75d68jk",
    "user": "689125e935f4b0aecfa75d55",
    "title": "mthsvsvy",
    "description": "wthvswab",
    "tag": "this isvwes tag ",
    "date": "2025-08-04T21:31:39.510Z",
    "__v": 0
  }
]
const [note , setNote] = useState(notesInitial)

const addNote =(title , description , tag)=>{
        //api call

        
    const noteNew =  {
    "_id": "689126bb35f4b0aecfa75d68jk",
    "user": "689125e935f4b0aecfa75d55",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2025-08-04T21:31:39.510Z",
    "__v": 0
  }
setNote([...note, noteNew]); // this is like push but immutable

}
const deleteNote =(id)=>{

    //api call
console.log(id);
const newNotes = note.filter((eachnote)=>{
    return eachnote._id!==id;
});
setNote(newNotes);
}
const editNote =()=>{

}

    return(
        <noteContext.Provider value = {{ note , setNote , addNote , deleteNote , editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;