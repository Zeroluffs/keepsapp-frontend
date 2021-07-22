import React, { useState } from "react";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import { CirclePicker } from "react-color";

export default function ColorPicker(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeComplete = (color, event) => {
    handleClose();
    props.putColor(color.hex);
  };

  return (
    <div>
      <ColorLensIcon
        fontSize={"small"}
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      ></ColorLensIcon>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <CirclePicker
          circleSpacing={8}
          width={"74px"}
          circleSize={16}
          colors={[
            "#FFFFFF",
            "#aa2e25",
            "#a31545",
            "#6d1b7b",
            "#1769aa",
            "#357a38",
            "#b2a429",
          ]}
          onChangeComplete={handleChangeComplete}
        ></CirclePicker>
      </Menu>
    </div>
  );
}
