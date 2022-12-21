import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import InputModal from "./InputModal";
import { FaShareSquare } from "react-icons/fa";

export default function NoteItem({ noteData }) {
  const [modalStatus, setModalStatus] = useState("");

  const context = useContext(noteContext);
  const { title, description, tag, _id, date } = noteData;

  const [fieldContent, setFieldContent] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
    saveBtnVisible: "",
    addBtnVisible: "is-hidden",
  });

  const handleEdit = (id) => {
    setFieldContent({
      ...fieldContent,
      id: id,
      title: title,
      description: description,
      tag: tag,
    });
    setModalStatus("is-active");
  };

  const { deletNote } = context;
  const handleDelete = (id) => {
    deletNote(id);
  };

  return (
    <>
      <InputModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        fieldContent={fieldContent}
      />
      <div className="box">
        <p className="title is-5 mb-2"> {title}</p>
        <p className="mb-3">{description}</p>
        <span style={{ fontSize: "0.7rem", color: "hsl(0, 0%, 71%)" }}>
          Last Updated: {date}
        </span>
        <div className="mt-3 is-flex is-justify-content-space-between">
          <div className="is-flex">
            <button
              className="button is-small mr-4"
              onClick={() => {
                handleEdit(_id);
              }}
            >
              Edit
            </button>
            <button
              className="button is-small is-danger"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
          </div>
          <div className="is-flex is-align-items-end">
            <FaShareSquare style={{ cursor: "pointer" }} size={"22px"} />
          </div>
        </div>
      </div>
    </>
  );
}
