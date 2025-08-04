import { Routes, Route } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import UserProfilePage from "./pages/UserProfilePage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/user/:userId" element={<UserProfilePage />} />
    </Routes>
  );
}

export default App;


