import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../layouts/Dashboard";
import ProtectRoute from "../layouts/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        ),
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
