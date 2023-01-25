import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import DisplayToDos from "./app";

export default function Home() {
  return (
    <div className="container App">
      <br />
      <br />
      <h2>EsJay ToDo List App</h2>
      <br />
      <br />
      {/*Display ToDos*/}
      <DisplayToDos />
    </div>
  );
}
