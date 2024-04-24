import { Link } from "react-router-dom"

export function UserList() {
  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Participantes</h1>
          <div className="px-3 w-72 py-1.5 border border-black rounded-lg flex items-center gap-3">
            <input
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
              placeholder="Buscar participante..."
            />
          </div>
        </div>

        <Link to={"/users/signup"}>
          <div className=" w-28 border rounded-lg py-1 bg-blue-700 text-white font-medium flex justify-center hover:bg-blue-800 active:bg-blue-900 cursor-pointer">
            <span>+ Usuário</span>
          </div>
        </Link>
      </div>
    </div>
  );
}