import React from "react";
import './App.css';
import Todo from "./components/Todo";

const App = () => {
  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title">Todo Application</h1>
      </div>
      <Todo/>
    </div>
  );
}

export default App;
