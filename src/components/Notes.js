import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

export default function Notes() {
  const { note, getNotes, editNote } = useContext(noteContext);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [notes, setnotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (eachnote) => {
    ref.current.click();
    setnotes({
      id: eachnote._id,
      etitle: eachnote.title,
      edescription: eachnote.description,
      etag: eachnote.tag,
    });
  };

  const handleClick = async (e) => {
    console.log("updating the note", notes);
    e.preventDefault();

    await editNote(notes.id, notes.etitle, notes.edescription, notes.etag);
    await getNotes();

    refClose.current.click();
  };
  const onChange = (e) => {
    setnotes({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {" "}
      <Addnote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit karen
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Your Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={notes.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={notes.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={notes.etag}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-plus"></i>
                  add note
                </button>
              </form>{" "}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={notes.etitle.length < 5 || notes.edescription.length < 5}
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-5">
        <h2>your notes</h2>
        {note.length === 0 && (
          <div className="container">no notes to display</div>
        )}
        {note.map((eachnote) => {
          return (
            <Noteitem
              key={eachnote._id}
              eachnote={eachnote}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </div>
  );
}
