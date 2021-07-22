import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import LabelIcon from "@material-ui/icons/Label";
export default function ActionBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <LabelIcon
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          fontSize={"small"}
        ></LabelIcon>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            value="Work"
            onClick={() => {
              handleClose();
              props.putLabel("Work");
            }}
          >
            Work
          </MenuItem>
          <MenuItem
            value="Personal"
            onClick={() => {
              handleClose();
              props.putLabel("Personal");
            }}
          >
            Personal
          </MenuItem>
          <MenuItem
            value="Education"
            onClick={() => {
              handleClose();
              props.putLabel("Education");
            }}
          >
            Education
          </MenuItem>
        </Menu>
    </div>
  );
}
