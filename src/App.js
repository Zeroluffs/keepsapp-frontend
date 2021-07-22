import "./App.css";
import CreateKeep from "./components/CreateKeep";
import Keeps from "./components/Keeps";
function App() {
  return (
    <div className="keepContainer">
      <CreateKeep />
      <Keeps />
    </div>
  );
}

export default App;
