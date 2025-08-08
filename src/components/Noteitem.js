import { useContext } from "react";
import noteContext from "../context/notes/Notecontext";

function Noteitem(props) {
  const { deleteNote } = useContext(noteContext);
  const { eachnote, updateNote , setAlert } = props;

  const onClick = () => {
    deleteNote(eachnote._id);
    setAlert("note deleted successfully","warning");
  };



  return (
    <div className="col-md-4">
      <div className="card my-3 ">
        <div className="card-body">
          <h5 className="card-title">{eachnote.title}</h5>
          <p className="card-text">{eachnote.description}</p>
          <button
            type="button"
            className="btn btn-outline-success mx-2 my-2"
            onClick={() => {
              return updateNote(eachnote);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i> edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger mx-2 my-2"
            onClick={onClick}
          >
            <i className="fa-solid fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
