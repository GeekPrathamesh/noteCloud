import { useContext } from "react";
import noteContext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
export default function Notes() {
    const { note, setNote } = useContext(noteContext);
  return (
    <div className="row px-5">
      <h2>your notes</h2>
      {note.map((eachnote) => {
        return <Noteitem  key={eachnote._id} eachnote={eachnote}/>
      })}
    </div>
  );
}
