import React, { useContext, useEffect, useState } from "react";
import InputModal from "../components/InputModal";
import NoteItem from "../components/NoteItem";
import noteContext from "../context/notes/noteContext";
import { FaPlus } from "react-icons/fa";
import userContext from "../context/user/userContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [modalStatus, setModalStatus] = useState("");
  const fieldContent = {
    title: "",
    description: "",
    tag: "",
    saveBtnVisible: "is-hidden",
    addBtnVisible: "",
  };

  const nContext = useContext(noteContext);
  const { notes, getNotes } = nContext;
  const uContext = useContext(userContext);
  const { user } = uContext;
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [notes]);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login");
    }
  }, []);

  const hendleAddNote = () => {
    setModalStatus("is-active");
  };

  return (
    <>
      <div>
        <div className=" mb-4 ">
          <button className="button is-primary " onClick={hendleAddNote}>
            <FaPlus /> &nbsp;Add note
          </button>
          <p className="">Access your note at anytime and anywhere</p>
        </div>

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
