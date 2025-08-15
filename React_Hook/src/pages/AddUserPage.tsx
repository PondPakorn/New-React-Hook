import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/User";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiRes = await fetch("https://jsonplaceholder.typicode.com/users");
        const apiData: User[] = await apiRes.json();

        const localData = localStorage.getItem("users");
        const localUsers: User[] = localData ? JSON.parse(localData) : [];

        const combined = [...apiData, ...localUsers];
        setUsers(combined);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const localData = localStorage.getItem("users");
    const localUsers: User[] = localData ? JSON.parse(localData) : [];

    const allUsers: User[] = [...users, ...localUsers];
    const maxId = allUsers.reduce((max, user) => Math.max(max, user.id), 0);
    const newId = maxId + 1;

    const userWithId: User = { ...newUser, id: newId };
    const updatedLocalUsers = [...localUsers, userWithId];

    console.log("New ID Assigned:", newId);

    localStorage.setItem("users", JSON.stringify(updatedLocalUsers));
    navigate("/");
  };

  return <AddUserForm existingUsers={users} onAddUser={handleAddUser} />;
};

export default AddUserPage;
