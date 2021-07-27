import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Paper, Button, InputBase, Collapse } from "@material-ui/core";
import "../App.css";
import ActionBar from "./ActionBar";
import ColorPicker from "./ColorPicker";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
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
        return "";
      }

      if (test.color === "#424242") {
        return "#424242";
      }
      return "";
    },
  },
}));

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

export default function CreateKeep({ putKeep }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");
  const [content, setContent] = useState("");
  let test = { color: color };
  const classes = useStyles(test);

  const handleClick = () => {
    setVisible(true);
  };
  const handleClickAway = () => {
    if (title || content.length > 0) {
      const keep = {
        title: title,
        description: content,
        label: label,
        color: color === "#424242" ? "" : color,
      };
      putKeep(keep);
      addKeep(keep);
      setVisible(false);
      setTitle("");
      setContent("");
      setColor("");
    }
    setVisible(false);
    setTitle("");
    setContent("");
    setColor("");
  };
  async function addKeep(keep) {
    api
      .post("keeps", keep)
      .then((res) => {
        if (res.status === 200) {
          putKeep(res.data);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding keep");
      });
  }
  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    <div className="keepMake">
      <Paper
        elevation={2}
        style={{ display: "inline-block", alignItems: "center" }}
        width="25%"
        className={classes.keepBG}
        color="primary"
      >
        <Collapse
          in={visible}
          classes={{ wrapperInner: classes.wrapper }}
          collapsedSize="2.7rem"
        >
          <InputBase
            color="primary"
            placeholder={visible ? "Title" : "Take a note..."}
            onClick={handleClick}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-base"
          ></InputBase>
          {visible ? (
            <div>
              <InputBase
                color="primary"
                placeholder={"Take a note"}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="input-base"
              ></InputBase>
              <div className="actionBar">
                <IconButton>
                  <ActionBar putLabel={(label) => setLabel(label)}></ActionBar>
                </IconButton>
                <IconButton>
                  <ColorPicker
                    putColor={(color) => setColor(color)}
                  ></ColorPicker>
                </IconButton>

                <Button onClick={handleClickAway}>Close</Button>
              </div>
            </div>
          ) : null}
        </Collapse>
      </Paper>
    </div>

    // {/* </ClickAwayListener> */}
  );
}
