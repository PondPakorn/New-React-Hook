// ✅ UserListPage.tsx
import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import type { User } from "../types/User";

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const apiUsers: User[] = await res.json();

        const localData = localStorage.getItem("users");
        const localUsers: User[] = localData ? JSON.parse(localData) : [];

        const lastApiId = Math.max(...apiUsers.map((u) => u.id));
        const adjustedLocalUsers = localUsers.map((user, index) => ({
          ...user,
          id: lastApiId + index + 1,

        }));

        setUsers([...apiUsers, ...adjustedLocalUsers]);
      } catch (error) {
        console.error("Error loading users", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear(); // หรือลบ key เฉพาะ เช่น localStorage.removeItem("users");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);




  return <UserList users={users} />;
};

export default UserListPage;
