import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import {
  Paper,
  Button,
  InputBase,
} from "@material-ui/core";
import "../App.css";
import ActionBar from "./ActionBar";
import ColorPicker from "./ColorPicker";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});




const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  keepBG: {
    backgroundColor: (test) => {
      if (test.color === "#aa2e25") {
        return "#aa2e25";
      }
      if (test.color === "#a31545") {
        return "#a31545";
      }
      if (test.color === "#6d1b7b") {
        return "#6d1b7b";
      }
      if (test.color === "#1769aa") {
        return "#1769aa";
      }
      if (test.color === "#357a38") {
        return "#357a38";
      }
      if (test.color === "#b2a429") {
        return "#b2a429";
      }
      if (test.color === "#FFFFFF") {
        return "#e4f0e2";
      }
      return "#FFFFFF";
    },
  },
}));

export default function EditKeep(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");
  const [content, setContent] = useState("");
  let test = { color: color };
  const classes = useStyles(test);
 
  const handleUpdate = async (keep) => {
    
    if (title || color || label || content.length > 0) {
      const newKeep = {
        title: title.length > 0 ? title : keep.title,
        description: content.length > 0 ? content : keep.description,
        color: color.length > 0 ? color : keep.color,
        label: label.length > 0 ? label : keep.label,
      };
      try {
        const response = await api.put(`/keeps/${keep._id}`, newKeep);
        console.log(response);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error(error);
      }
    }
    setTitle("");
    setContent("");
  };
  const body = (
    <div className="keepMake">
      <Paper
        elevation={2}
        style={{ display: "inline-block", alignItems: "center" }}
        width="25%"
        className={classes.keepBG}
      >
        <InputBase
          defaultValue={props.keep.title}
          onChange={(event) => setTitle(event.target.value)}
          className="input-base"
        ></InputBase>

        <div>
          <InputBase
            defaultValue={props.keep.description}
            onChange={(event) => setContent(event.target.value)}
            className="input-base"
          ></InputBase>
          <div className="actionBar">
            <IconButton>
              <ActionBar putLabel={(label) => setLabel(label)}></ActionBar>
            </IconButton>
            <IconButton>
              <ColorPicker putColor={(color) => setColor(color)}></ColorPicker>
            </IconButton>
            <Button
              onClick={() => {
                handleUpdate(props.keep);
                props.toggleModal();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );

  return (
    <div>
      {!props.show ? null : (
        <Modal
          open={props.show}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      )}
    </div>
  );
}
