import "./global.css";

import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root")!;
rootElement.setAttribute("translate", "no");

createRoot(rootElement).render(<App />);

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});