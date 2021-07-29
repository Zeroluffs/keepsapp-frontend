import React, { useState, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import EditKeep from "./EditKeep";
export default function KeepCard({ keep, handleDelete }) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <div>
        <Card style={{ backgroundColor: keep.color }} elevation={1}>
          <CardHeader
            title={keep.title}
            subheader={keep.label}
            action={
              <IconButton onClick={() => handleDelete(keep._id)}>
                <DeleteOutlined />
              </IconButton>
            }
          ></CardHeader>
          <CardContent
            onClick={() => {
              toggleModal();
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {keep.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <EditKeep show={open} toggleModal={toggleModal} keep={keep}></EditKeep>
    </Fragment>
  );
}
