import { useContext } from "react";
import noteContext from "../context/notes/Notecontext";

function Noteitem(props) {
  const { deleteNote } = useContext(noteContext);

  const { eachnote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-5 ">
        <div className="card-body">
          <h5 className="card-title">{eachnote.title}</h5>
          <p className="card-text">
            {eachnote.description} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Corporis, provident. Tempora iure hic incidunt
            ducimus voluptate, porro repellat doloremque exercitationem, earum
            voluptatum eos id itaque magni in excepturi aliquid ab soluta animi
            expedita rem!
          </p>
          <button type="button" className="btn btn-outline-success mx-2">
            <i className="fa-solid fa-pen-to-square"></i> edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger mx-2"
            onClick={() => {
              deleteNote(eachnote._id);
            }}
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
