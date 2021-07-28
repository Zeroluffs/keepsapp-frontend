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
  console.log("im here", keepsC.tasks);
  // console.log(keepsC.tasks);
  const [keeps, setKeeps] = useState([]);
  // useEffect(() => {
  //   if (props.label !== "") {
  //     api.get(`keeps/label/${props.label}`).then((res) => setKeeps(res.data));
  //   } else {
  //     api.get("/keeps").then((res) => setKeeps(res.data));
  //   }
  // }, [props]);

  // useEffect(() => {
  //   let newKeeps = [...keeps];
  //   newKeeps.push(props.keep);
  //   setKeeps(newKeeps);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
        {keepsC.tasks.map((keep) => (
          <div key={keep._id}>
            <KeepCard keep={keep} handleDelete={handleDelete}></KeepCard>
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
