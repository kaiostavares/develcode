import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default-avatar.png";
interface Users {
  id: string;
  name: string;
  code: string;
  birthDate: string;
  imageBase64: string;
}

export function UserList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState<Users[]>([]);

  const totalPages = total === 0 ? 1 : Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL("http://localhost:8080/users");

    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 1) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function getImageType(base64String: string): string {
    const base64Header = base64String.substring(0, 30);

    if (base64Header.includes("image/png")) {
      return "png";
    }
    if (
      base64Header.includes("image/jpeg") ||
      base64Header.includes("image/jpg")
    ) {
      return "jpeg";
    }
    return "png";
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center py-2 flex-wrap">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Usuários</h1>
          <div className="px-3 w-full md:w-72 py-1.5 border border-black rounded-lg flex items-center gap-3">
            <input
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
              placeholder="Buscar usuários..."
              value={search}
              onChange={onSearchInputChanged}
            />
          </div>
        </div>

        <Link to={"/users/signup"}>
          <div className="w-full md:w-auto mt-3 md:mt-0">
            <div className="w-full md:w-28 border rounded-lg py-1 bg-blue-700 text-white font-medium flex justify-center hover:bg-blue-800 active:bg-blue-900 cursor-pointer">
              <span>+ Usuário</span>
            </div>
          </div>
        </Link>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-black">
            <TableHeader>Código</TableHeader>
            <TableHeader>Foto</TableHeader>
            <TableHeader>Usuário</TableHeader>
            <TableHeader>Data de nascimento</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.imageBase64 ? (
                    <img
                      className="border rounded-full w-20 h-20"
                      src={`data:image/${getImageType(
                        user.imageBase64
                      )};base64,${user.imageBase64}`}
                      alt="Imagem do usuário"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target) {
                          target.src = defaultImage;
                        }
                      }}
                    />
                  ) : (
                    <img src={defaultImage} alt="Imagem do usuário" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{user.name}</span>
                    <span>{user.code}</span>
                  </div>
                </TableCell>
                <TableCell>{user.birthDate}</TableCell>

                <TableCell>
                  <Link to={`/users/${user.id}/edit`}>
                    <IconButton
                      transparent
                      className="bg-black/20 border border-white/10 rounded-md p-1.5"
                    >
                      <Pencil className="size-4" />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {users.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
