import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { taskReducer } from "./Reducers/TaskReducer";
import { Action } from "./Reducers/TaskReducer";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
export const KeepContext = createContext();

export function KeepContextProvider(props) {
  const [keeps, setKeeps] = useState([]);
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    getKeeps();
  }, []);

  async function getKeeps() {
    try {
      const response = await api.get("/keeps");
      setKeeps(response.data);
      const array = response.data;

      for (let i = 0; i < array.length; i++) {
        dispatch({
          type: Action.ADD_TASK,
          payload: array[i],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function addKeep(keeptoAdd) {
    // let newKeeps = [...keeps];
    // newKeeps.push(keepAdd);
    // setKeeps(newKeeps);

    console.log("sup", keeptoAdd);
    dispatch({ type: Action.ADD_TASK, payload: keeptoAdd });
  }

  function updateKeep(keeptoUpdate) {
    dispatch({ type: Action.UPDATE_TASK, payload: keeptoUpdate });
  }

  async function deleteKeep(_id) {
    await api.delete(`/keeps/${_id}`);

    let keepid = _id;
    dispatch({ type: Action.REMOVE_TASK, payload: keepid });
  }
  return (
    <KeepContext.Provider
      value={{ tasks, keeps, dispatch, addKeep, deleteKeep, updateKeep }}
    >
      {props.children}
    </KeepContext.Provider>
  );
}
