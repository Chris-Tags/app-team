import { useEffect, useMemo, useState } from "react";
import "./teamapp.scss";
import UserSearch from "./UserSearch";
import UsersSorted from "./UsersSorted";
import UsersTable from "./UsersTable";

export default function TeamApp() {
  const API_URL = "https://randomuser.me/api/?results=6";
  const [users, setUsers] = useState([]);
  const [originUsers, setOriginUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const autocompleteUsers = useMemo(
    () =>
      users.filter((user) => {
        const newUserData =
          user.name.last
            .toUpperCase()
            .includes(inputSearch.trim().toUpperCase()) ||
          user.name.first
            .toUpperCase()
            .includes(inputSearch.trim().toUpperCase()) ||
          user.location.country
            .toUpperCase()
            .includes(inputSearch.trim().toUpperCase()) ||
          user.location.city
            .toUpperCase()
            .includes(inputSearch.trim().toUpperCase());
        return newUserData;
      }),
    [users, inputSearch],
  );

  const handleChangeInput = (event) => {
    setInputSearch(event.target.value);
  };

  const sortUsers = (typeSort) => {
    const compareGenericFunc = (arr, fn) => {
      return arr.toSorted((a, b) => fn(a).localeCompare(fn(b)));
    };

    const typeCompare = {
      name(arr) {
        return compareGenericFunc(arr, (u) => u.name.last);
      },
      country(arr) {
        return compareGenericFunc(arr, (u) => u.location.country);
      },
      city(arr) {
        return compareGenericFunc(arr, (u) => u.location.city);
      },
    };

    switch (typeSort) {
      case "Name":
        setUsers(typeCompare.name(users));
        break;
      case "Country":
        setUsers(typeCompare.country(users));
        break;
      case "City":
        setUsers(typeCompare.city(users));
        break;
      default:
        setUsers(originUsers);
    }
  };

  const fetchLoader = async (url, signal) => {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });
    if (!response.ok) throw new Error("HTTP Error: " + response.status);
    return await response.json();
  };

  useEffect(() => {
    const controller = new AbortController();
    async function usersLoad() {
      try {
        const data = await fetchLoader(API_URL, controller.signal);
        setUsers(data?.results);
        setOriginUsers(data?.results);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error(error.message);
      }
    }
    usersLoad();
    return () => controller.abort();
  }, []);

  return (
    <div className="wrapperapp">
      <UserSearch valueInput={inputSearch} onChangeInput={handleChangeInput} />

      {inputSearch ? (
        <UsersTable
          usersData={autocompleteUsers}
          isAutoComplete={inputSearch.length > 0}
        />
      ) : null}
      <p style={{ fontSize: "1.5rem" }}>
        {Array.isArray(autocompleteUsers) && autocompleteUsers.length > 0
          ? autocompleteUsers.length
          : users.length}{" "}
        résultats
      </p>
      <UsersSorted onClickSort={sortUsers} />
      <UsersTable usersData={users} />
    </div>
  );
}
