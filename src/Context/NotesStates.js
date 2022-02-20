import { useEffect, useState } from "react";
import NotesContext from "./NotesContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
const NoteStates = (props) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth-token")
  );

  const [Notes, setNotes] = useState([]);
  const [edit, setEdit] = useState({ isEdit: false, item: null });

  const NotesURL = `http://localhost:5000/api/notes`;

  const getAllNotes = async () => {
    const URL = NotesURL + "/getallnotes";
    const response = await axios.get(URL, {
      headers: {
        "auth-token": authToken,
      },
    });
    setNotes(response.data);
  };

  const addItem = async () => {
    if (edit.isEdit) {
      //Logic for editing
      setNotes((currentState) => {
        currentState[
          currentState.findIndex((item) => item._id == edit.item._id)
        ] = edit.item;
        console.info("Editing Note", currentState);
        setNotes(currentState);

        const URL = NotesURL + "/updatenote";
        axios.put(
          URL,
          { ...edit.item, id: edit.item._id },
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );
      });
    } else {
      //Logic for adding
      console.info("Adding Note");
      const URL = NotesURL + "/createnote";
      const result = await axios.post(
        URL,
        { ...edit.item, date: Date.now() },
        { headers: { "auth-token": authToken } }
      );

      setNotes((currentState) => {
        currentState = [...currentState, result.data];
        setNotes(currentState);
      });
    }
  };

  function deleteItem(id) {
    console.warn("Deleting the item with id : " + id);
    setNotes((currentState) => {
      currentState = currentState.filter((item) => item._id !== id);
      setNotes(currentState);

      const URL = NotesURL + "/deletenote";
      axios.delete(URL, {
        headers: { "auth-token": authToken },
        data: { id: id },
      });
    });
  }
  return (
    <NotesContext.Provider
      value={{
        Notes,
        setNotes,
        edit,
        setEdit,
        addItem,
        deleteItem,
        getAllNotes,
      }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NoteStates;
