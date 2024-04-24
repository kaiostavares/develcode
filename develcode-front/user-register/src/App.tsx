import { RouterProvider } from "react-router-dom";
import { Header } from "./components/header/header";
import router from "./routes";

export function App() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <RouterProvider router={router}/>
    </div>
  )
} 

