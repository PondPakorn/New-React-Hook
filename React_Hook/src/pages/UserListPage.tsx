// ✅ UserListPage.tsx
import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import type { User } from "../types/User";
import { Typography } from "@mui/material";

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");

      const apiUsers: User[] = await res.json();

      const localData = localStorage.getItem("users");
      let localUsers: User[] = [];

      try {
        const parsed = JSON.parse(localData || "[]");
        if (Array.isArray(parsed)) {
          localUsers = parsed;
        } else {
          console.warn("Invalid local users format");
        }
      } catch (e) {
        console.error("Failed to parse local users", e);
      }

      const lastApiId = Math.max(...apiUsers.map((u) => u.id));
      const adjustedLocalUsers = localUsers.map((user, index) => ({
        ...user,
        id: lastApiId + index + 1,
      }));

      setUsers([...apiUsers, ...adjustedLocalUsers]);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBeforeUnload = () => {
    localStorage.clear(); // หรือ localStorage.removeItem("users");
  };

  fetchData();
  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

if (loading) {
  return <Typography color="white" p={4}>Loading...</Typography>;
}

if (error) {
  return <Typography color="error" p={4}>{error}</Typography>;
}

return <UserList users={users} />;

};

export default UserListPage;
