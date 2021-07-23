import React, { useState } from "react";
import "./App.css";
import CreateKeep from "./components/CreateKeep";
import Keeps from "./components/Keeps";
import { Paper } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import NavBar from "./components/NavBar";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }} className="keepContainer">
        <NavBar check={darkMode} change={() => setDarkMode(!darkMode)} />
        <CreateKeep darkMode={darkMode} />
        <Keeps />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
