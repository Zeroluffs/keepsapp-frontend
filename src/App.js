/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect} from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import MiniDrawer from "./components/Drawer";
import { ThemeContext } from "./context/ThemeContext";
function App() {
  const dlMode = useContext(ThemeContext);
  const theme = createTheme({
    palette: {
      type: dlMode.state.darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    const existingTheme = localStorage.getItem("theme");
    if (existingTheme) {
      if (existingTheme === "light") {
        dlMode.dispatch({ type: "LIGHTMODE" });
      } else {
        dlMode.dispatch({ type: "DARKMODE" });
      }
    } else {
      localStorage.setItem("theme", "light");
      dlMode.dispatch({ type: "LIGHTMODE" });
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer></MiniDrawer>

      {/* <Paper style={{ height: "100vh" }} className="keepContainer">
        <NavBar check={darkMode} change={() => setDarkMode(!darkMode)} /> */}
      {/* <CreateKeep darkMode={darkMode} /> */}
      {/* <Keeps />
      </Paper> */}
    </ThemeProvider>
  );
}

export default App;
