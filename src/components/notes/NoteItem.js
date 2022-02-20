import React, { useContext } from "react";
import { Accordion, Card } from "react-bootstrap";
import NotesContext from "../../Context/NotesContext";

export default function (props) {
  const { setEdit, deleteItem } = useContext(NotesContext);

  //Click Handler uses currentTarget to fetch id during bubbling of the events
  function clickHandler(e) {
    console.info("Target: ", e.currentTarget.id);
    if (e.currentTarget.id == "editBtn") {
      console.info("Adding item to edit");
      setEdit({ isEdit: true, item: props.note });
    } else if (e.currentTarget.id == "deleteBtn") {
      deleteItem(props.note._id);
    }
  }

  return (
    <Accordion.Item eventKey={props.note._id}>
      <Accordion.Header>
        <div className="flex">
          <h5 className="flex-item">{props.note.title}</h5>
          <p>
            {new Date(props.note.date).toLocaleTimeString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "IST",
            })}
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div>
          <p>{props.note.description}</p>
          <button
            type="button"
            id="editBtn"
            className="btn btn-outline-primary mx-2"
            onClick={clickHandler.bind("edit")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
            </svg>
            <span className="mx-2">Edit</span>
          </button>
          <button
            type="button"
            id="deleteBtn"
            className="btn btn-outline-danger mx-2"
            onClick={clickHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-archive"
              viewBox="0 0 16 16">
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"></path>
            </svg>
            <span className="mx-2">Delete</span>
          </button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
