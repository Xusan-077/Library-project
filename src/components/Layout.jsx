import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="my-[50px] min-h-[calc(100vh-24rem)]">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
