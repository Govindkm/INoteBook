import { useState } from "react";
import NotesContext from "./NotesContext";
const NoteStates = (props) => {
  const sample = [
    {
      _id: "62035464fd1f8023fbe6cbda",
      userid: "61ef9fe60d4702c9da93bc19",
      title: "Great lakes university 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora blanditiis illum doloremque eaque dignissimos, earum vel aperiam eligendi quibusdam et doloribus quae quis, minus non ipsum sit eos? Optio, asperiores.",
      tag: "Garam Masala",
      date: "3762-07-10T15:09:25.565Z",
      __v: 0,
    },
    {
      _id: "62035464fd1f80gdgg23fbe6cbda",
      userid: "61ef9fe60d4702c9da93bc19",
      title: "Great lakes university 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora blanditiis illum doloremque eaque dignissimos, earum vel aperiam eligendi quibusdam et doloribus quae quis, minus non ipsum sit eos? Optio, asperiores.",
      tag: "Garam Masala",
      date: "3762-07-10T15:09:25.565Z",
      __v: 0,
    },
    {
      _id: "62035464faaddd1f8023fbe6cbda",
      userid: "61ef9fe60d4702c9da93bc19",
      title: "Great lakes university 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora blanditiis illum doloremque eaque dignissimos, earum vel aperiam eligendi quibusdam et doloribus quae quis, minus non ipsum sit eos? Optio, asperiores.",
      tag: "Garam Masala",
      date: "3762-07-10T15:09:25.565Z",
      __v: 0,
    },
  ];
  const [Notes, setNotes] = useState(sample);
  const [Form, setForm] = useState({ isEdit: false, item: null });
  return (
    <NotesContext.Provider value={{ Notes, setNotes, Form, setForm }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NoteStates;
