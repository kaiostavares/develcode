import { createBrowserRouter } from "react-router-dom";
import { UserList } from "./components/user-list";
import ErrorPage from "./error-page";
import { UserRegister } from "./components/user-register";


const router = createBrowserRouter([
  {
    path:"*",
    element: <ErrorPage/>
  },
  {
    path: "/",
    element: <UserList/>,
  },
  {
    path: "/users/signup",
    element: <UserRegister/>
  }
]);

export default router;