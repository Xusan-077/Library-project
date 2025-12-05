import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import PublicBookDetailPage from "./pages/PublicBookDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import PublicLibraryPage from "./pages/PublicLibraryPage";
import { ToastContainer } from "react-toastify";
import MyBooks from "./pages/MyBooks";
import useAuthStore from "./store/useUserAuth";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Likes from "./pages/Likes";

export default function App() {
  const { isAuth } = useAuthStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="library/:libraryId" element={<PublicLibraryPage />} />
          <Route path="books" element={<Books />} />
          <Route path="favorites" element={<Likes />} />
          {isAuth && <Route path="my-books" element={<MyBooks />} />}
          {isAuth && <Route path="profile" element={<Profile />} />}
          <Route path="book/:bookId" element={<PublicBookDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {!isAuth && <Route path="/login" element={<Login />} />}
        {!isAuth && <Route path="/register" element={<Register />} />}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
