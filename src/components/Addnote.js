import { useContext, useState } from "react";
import noteContext from "../context/notes/Notecontext";

function Addnote({setAlert}) {
  const { addNote } = useContext(noteContext);

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({
    title: "",
    description: "",
    tag: "",
  })
      setAlert("added note successfully","success")

  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
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
              name="title" value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >
              description
            </label>
            <input
              type="text" value={note.description}
              className="form-control"
              id="description"
              name="description"
              onChange={onChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Tag
            </label>
            <input
              type="text"
              value={note.tag}
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
          disabled={note.title.length<5 || note.description.length<5}
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
