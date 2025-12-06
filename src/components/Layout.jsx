import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useThemeStore from "../store/useThemeStore";

export default function Layout() {
  const { theme } = useThemeStore();

  return (
    <>
      <Header />
      <main
        className={`${
          theme == "light" ? " my-[50px]" : "bg-[#0A0F18] py-[50px] m-0"
        } min-h-[calc(100vh-24rem)]`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
