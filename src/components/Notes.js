import { useContext, useEffect } from "react";
import noteContext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

export default function Notes() {
    const { note , getNotes  } = useContext(noteContext);
    useEffect(()=>{
getNotes();
    },[])
  return (<div> <Addnote />

    <div className="row px-5">
      <h2>your notes</h2>
      {note.map((eachnote) => {
        return <Noteitem  key={eachnote._id} eachnote={eachnote}/>
      })}
    </div></div>
         
  );
}
