import React, { useContext, useEffect, useState } from "react";
import InputModal from "../components/InputModal";
import NoteItem from "../components/NoteItem";
import noteContext from "../context/notes/noteContext";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [modalStatus, setModalStatus] = useState("");

  const fieldContent = {
    title: "",
    description: "",
    tag: "",
    saveBtnVisible: "is-hidden",
    addBtnVisible: "",
  };

  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [notes]);

  const hendleAddNote = () => {
    setModalStatus("is-active");
  };

  return (
    <>
      <div>
        {/* <h1 className="title is-6">Add your notes</h1> */}
        <button className="button is-primary mb-4" onClick={hendleAddNote}>
          <FaPlus /> &nbsp;Add note
        </button>

        <InputModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          fieldContent={fieldContent}
        />

        <div className="columns is-flex-wrap-wrap">
          {notes.map((note) => {
            return (
              <div className="column is-4" key={note._id}>
                <NoteItem noteData={note} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
