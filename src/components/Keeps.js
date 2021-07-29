import React, { useEffect, useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import KeepCard from "./KeepCard";
import axios from "axios";
import { KeepContext } from "../context/KeepContext";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
export default function Keeps(props) {
  const keepsC = useContext(KeepContext);
  const [keeps, setKeeps] = useState([]);
  const [arrayLabel, setArrayLabel] = useState([]);

  // useEffect(() => {
  //   let newKeeps = [...keeps];
  //   newKeeps.push(props.keep);
  //   setKeeps(newKeeps);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (props.label !== "") {
      let newArray = arrayLabel.filter((keep) => keep.label === props.label);
      setKeeps(newArray);
    } else {
      setKeeps(keepsC.tasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  useEffect(() => {
    setKeeps(keepsC.tasks);
    setArrayLabel(keepsC.tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keepsC]);
  const handleDelete = async (keepID) => {
    await api.delete(`/keeps/${keepID}`);
    keepsC.deleteKeep(`${keepID}`);
  };
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {keeps.map((keep) => (
          <div key={keep._id}>
            <KeepCard keep={keep} handleDelete={handleDelete}></KeepCard>
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
