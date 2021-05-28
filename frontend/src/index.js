import React from "react";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

// notification types: success, danger, info, default, warning

export const raiseNotification = (title, message, type) => {
  switch (type) {
    case "success":
      return store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          click: true,
        },
      });
    case "info":
      return store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          click: true,
        },
      });
    case "warning":
      return store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          click: true,
        },
      });
    case "danger":
      return store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 0,
          click: true,
          showIcon: true,
        },
      });
    default:
      return null;
  }
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactNotification />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
