import React, { useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import MiniDrawer from "./components/Drawer";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer
        darkMode={darkMode}
        check={darkMode}
        change={() => setDarkMode(!darkMode)}
      ></MiniDrawer>

      {/* <Paper style={{ height: "100vh" }} className="keepContainer">
        <NavBar check={darkMode} change={() => setDarkMode(!darkMode)} /> */}
      {/* <CreateKeep darkMode={darkMode} /> */}
      {/* <Keeps />
      </Paper> */}
    </ThemeProvider>
  );
}

export default App;
