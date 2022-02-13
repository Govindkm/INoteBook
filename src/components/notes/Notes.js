import React, { useContext } from "react";
import { Accordion } from "react-bootstrap";
import NotesContext from "../../Context/NotesContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const { Notes, setNotes } = useContext(NotesContext);
  return (
    <div>
      <Accordion flush>
        {Notes.map((note) => {
          return <NoteItem note={note} key={note._id} />;
        })}
      </Accordion>
    </div>
  );
}
