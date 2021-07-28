export const Action = {
  ADD_TASK: "add-task",
  UPDATE_TASK: "update-task",
  REMOVE_TASK: "remove-task",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case Action.ADD_TASK: {
      return [...state, action.payload];
    }
    case Action.UPDATE_TASK: {
      // const filtered = state.filter((task) => task._id !== action.payload._id);
      let index = state.findIndex((task) => task._id === action.payload._id);
      const filtered = state.filter((task) => task._id !== action.payload._id);
      state.splice(index, 1, action.payload);
      console.log("f", filtered);
      return [...state];
    }
    case Action.REMOVE_TASK: {
      console.log(action.payload);
      return state.filter((task) => task._id !== action.payload);
    }
    default:
      return state;
  }
};
