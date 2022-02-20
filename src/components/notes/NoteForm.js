import React, { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import NotesContext from "../../Context/NotesContext";

// This component is used to render form for inputs and can handle both edit and add using a single form
export default function NoteForm() {
  const { edit, setEdit, addItem } = useContext(NotesContext);

  const formRef = useRef(null);

  //Edits the formitem
  function changeHandler(e) {
    console.log(e);
    setEdit({
      ...edit,
      item: { ...edit.item, [e.target.name]: e.target.value },
    });
  }

  // This will get activated on click of add/submit button
  function addHandler(e) {
    e.preventDefault();
    addItem();
  }
  return (
    <div>
      {
        <Form ref={formRef}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={edit.isEdit ? "" : "Enter Title"}
              value={edit?.item?.title || ""}
              name="title"
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">Enter note title here.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder={edit.isEdit ? "" : "Enter Description"}
              value={edit?.item?.description || ""}
              name="description"
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">
              Enter note description here.
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            onClick={addHandler}
            disabled={
              edit.item?.title?.length < 5 || edit.item?.description?.length < 5
            }>
            {edit.isEdit ? "Submit" : "Add"}
          </Button>
        </Form>
      }
    </div>
  );
}
