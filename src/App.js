import React, { useContext } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import MiniDrawer from "./components/Drawer";
import { ThemeContext } from "./context/ThemeContext";
function App() {
  const dlMode = useContext(ThemeContext);
  console.log(dlMode.state.darkMode);
  const theme = createTheme({
    palette: {
      type: dlMode.state.darkMode ? "dark" : "light",
    },
  });
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
