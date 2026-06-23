import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route.jsx";
import { TaskProvider } from "./contexts/TaskContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </StrictMode>,
);
