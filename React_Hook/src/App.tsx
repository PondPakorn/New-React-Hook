import { Routes, Route } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import UserProfilePage from "./pages/UserProfilePage"; 
import AddUserPage from "./pages/AddUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/user/:userId" element={<UserProfilePage />} />
      <Route path="/add" element={<AddUserPage />} />
    </Routes>
  );
}

export default App;


