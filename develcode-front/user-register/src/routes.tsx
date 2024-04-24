import { createBrowserRouter } from "react-router-dom";
import { UserList } from "./components/user-list";
import ErrorPage from "./error-page";


const router = createBrowserRouter([
  {
    path:"*",
    element: <ErrorPage/>
  },
  {
    path: "/",
    element: <UserList/>,
  }
]);

export default router;