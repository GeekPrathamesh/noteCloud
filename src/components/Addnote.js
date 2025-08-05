import Alert from "./Alert";
import { useContext, useState } from "react";
import noteContext from "../context/notes/Notecontext";

function Addnote() {
  const { addNote } = useContext(noteContext);

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Alert message="Note deleted successfully" />
      <div className="my-4 px-5">
        <h2>add the notes</h2>

        <form className="my-2">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Your Note
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            <i className="fa-solid fa-plus"></i>
            add note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
