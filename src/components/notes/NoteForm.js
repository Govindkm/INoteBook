import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import NotesContext from "../../Context/NotesContext";

export default function NoteForm() {
  const { Form: edit } = useContext(NotesContext);
  function changeHandler() {}
  return (
    <div>
      {
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={edit.isEdit ? "" : "Enter Title"}
              value={edit.isEdit ? edit.item.title : ""}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">Enter note title here.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder={edit.isEdit ? "" : "Enter Description"}
              value={edit.isEdit ? edit.item.description : ""}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">
              Enter note description here.
            </Form.Text>
          </Form.Group>
          <Button variant="primary">{edit.isEdit ? "Submit" : "Add"}</Button>
        </Form>
      }
    </div>
  );
}
