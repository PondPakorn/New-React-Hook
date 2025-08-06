// ✅ AddUserPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/User";

const AddUserPage = () => {
  const navigate = useNavigate();
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

  const handleAddUser = (newUser: User) => {
    const lastId = Math.max(...users.map((u) => u.id));
    const userWithId = { ...newUser, id: lastId + 1 };

    const localData = localStorage.getItem("users");
    const localUsers: User[] = localData ? JSON.parse(localData) : [];
    const updatedLocal = [...localUsers, userWithId];

    localStorage.setItem("users", JSON.stringify(updatedLocal));
    navigate("/");
  };

  return <AddUserForm existingUsers={users} onAddUser={handleAddUser} />;
};

export default AddUserPage;