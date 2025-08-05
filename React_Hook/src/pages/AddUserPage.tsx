// AddUserPage.tsx
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
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
    navigate("/");
  };

  return <AddUserForm existingUsers={users} onAddUser={handleAddUser} />;
};

export default AddUserPage;
