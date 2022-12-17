import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteProvider = (props) => {
  const host = process.env.REACT_APP_HOST;
  const authToken = localStorage.getItem("auth-token");
  const [notes, setNotes] = useState([]);

  // 1. to get all notes
  const getNotes = async () => {
    // api call
    if (authToken) {
      const response = await fetch(`${host}/api/notes/getnote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const json = await response.json();
      setNotes(json);
    }
  };

  // 2. to add note
  const addNote = async (title, description, tag) => {
    // api call
    if (authToken) {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();

      // to add note in client
      const note = {
        title: title,
        description: description,
        tag: tag,
      };
      setNotes(notes.concat(note));
    }
  };

  // 3. to edit note
  const editNote = async (id, title, description, tag) => {
    // api call
    if (authToken) {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ id, title, description, tag }),
      });
      const json = await response.json();

      // update in client
      for (let i = 0; i < notes.length; i++) {
        if (notes[i]._id === id) {
          notes[i].title = title;
          notes[i].description = description;
          notes[i].tag = tag;
        }
      }
      setNotes(notes);
    }
  };

  // 4. to delete note
  const deletNote = async (id) => {
    // api call to delete form database
    if (authToken) {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const json = await response.json();

      // delete from client
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deletNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteProvider;
