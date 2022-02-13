import React, { useContext } from "react";
import NotesContext from "../Context/NotesContext";
import NoteForm from "./notes/NoteForm";
import Notes from "./notes/Notes";

export default function Home() {
  const { Notes: myNotes, Form: edit } = useContext(NotesContext);
  return (
    <>
      <div className="my-3">
        {edit.isEdit ? <h1>Edit Note</h1> : <h1>Add Note</h1>}
        <hr />
        <NoteForm></NoteForm>
      </div>
      <hr />
      <div>
        {myNotes.length > 0 ? (
          <>
            <h1>Your current notes</h1>
            <hr />
            <Notes></Notes>
          </>
        ) : (
          <h2>You have not added any notes</h2>
        )}
      </div>
    </>
  );
}
