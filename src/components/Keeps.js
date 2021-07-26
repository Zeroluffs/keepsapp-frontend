import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import KeepCard from "./KeepCard";
import axios from "axios";

import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
export default function Keeps(props) {
  const [keeps, setKeeps] = useState([]);

  useEffect(() => {
    if (props.label !== "") {
      api.get(`keeps/${props.label}`).then((res) => setKeeps(res.data));
    } else {
      api.get("/keeps").then((res) => setKeeps(res.data));
    }
  }, [props]);

  const handleDelete = async (keepID) => {
    await api.delete(`/keeps/${keepID}`);
    const newKeeps = keeps.filter((keep) => keep._id !== keepID);
    setKeeps(newKeeps);
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
