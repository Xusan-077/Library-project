import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import useAuthStore from "../store/useUserAuth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../../API/API";

export default function Header() {
  const [burger, setBurger] = useState(false);

  const { isAuth, setIsAuth, user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access");

  const { data: userAction } = useQuery({
    queryFn: async () => {
      const res = await AuthAPI.get("/auth/profile/");

      return res.data;
    },
    queryKey: ["userData"],
    enabled: !!accessToken,
  });

  const userName = user?.user?.name;
  const capitalizedName = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1)
    : "";

  useEffect(() => {
    setUser(userAction);
  }, [userAction]);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (access && refresh) {
      setIsAuth();
    }
  }, []);

  return (
    <header className="border-b border-b-gray-300 shadow-sm sticky top-0 z-100 w-full bg-white">
      <div className="container">
        <div className="flex p-[20px_0] items-center justify-between">
          <Link className="flex items-center gap-2" to="/">
            <img src={Logo} alt="" className="w-10 h-10" />
            <span className="text-[25px] font-bold text-gray-900">
              LibraSpace
            </span>
          </Link>

          <nav className="flex items-center max-[850px]:hidden">
            {[
              {
                text: "Home",
                path: "/",
              },
              {
                text: "Books",
                path: "/books",
              },
              {
                text: "libraries",
                path: "/library",
              },
              {
                text: "Favorites",
                path: "/favorites",
              },
            ].map((el, index) => (
              <li key={index} className="p-[10px_20px]">
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-b-2 border-b-yellow-700 text-yellow-700 "
                        : ""
                    } text-[18px] text-gray-800 pb-2.5 font-medium  transition-all duration-300 ease hover:text-yellow-700`
                  }
                >
                  {el.text}
                </NavLink>
              </li>
            ))}
            {isAuth && (
              <li className="p-[10px_20px]">
                <NavLink
                  to="my-books"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-b-2 border-b-yellow-700 text-yellow-700"
                        : ""
                    } text-[18px] text-gray-800 pb-2.5 font-medium  transition-all duration-300 ease hover:text-yellow-700`
                  }
                >
                  My books
                </NavLink>
              </li>
            )}
          </nav>

          <div className="flex items-center gap-5">
            <div className="max-[850px]:hidden">
              {isAuth ? (
                <div
                  onClick={() => navigate("/profile")}
                  className="flex gap-5 cursor-pointer items-center "
                >
                  <p className="text-[26px] font-bold">
                    <span className="text-yellow-700 font-semibold">Hi ,</span>
                    {capitalizedName ? capitalizedName : "User"}!
                  </p>

                  <button className="cursor-pointer">
                    <i className="text-gray-600 text-[40px] bi bi-person-circle"></i>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-[16px] font-medium p-[8px_20px] bg-blue-400 text-white rounded-lg"
                >
                  Login
                </button>
              )}
            </div>

            <div
              onClick={() => setBurger(true)}
              className="hidden max-[850px]:block"
            >
              <button className="">
                <i className="text-[30px] bi bi-list"></i>
              </button>
            </div>

            {burger && (
              <div className="fixed max-[850px]:flex hidden inset-0 bg-[#0009] z-200 ">
                <div className="w-[230px] bg-white p-5 shadow-2xl h-screen">
                  <Link className="flex items-center gap-2 mb-3" to="/">
                    <img src={Logo} alt="" className="w-10 h-10" />
                    <span className="text-[25px] font-bold text-gray-900">
                      LibraSpace
                    </span>
                  </Link>
                  {isAuth ? (
                    <div
                      onClick={() => {
                        navigate("/profile");
                        setBurger(false);
                      }}
                      className="mb-5 flex gap-5 cursor-pointer justify-between p-[0_5px] border-b border-b-gray-300 pb-5 items-center "
                    >
                      <p className="text-[26px] font-bold">
                        <span className="text-yellow-700 font-semibold">
                          Hi ,
                        </span>
                        {capitalizedName ? capitalizedName : "User"}!
                      </p>

                      <button className="cursor-pointer">
                        <i className="text-gray-600 text-[40px] bi bi-person-circle"></i>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <nav>
                    <ul className="flex flex-col">
                      {[
                        { text: "Home", path: "/" },
                        { text: "Books", path: "/books" },
                        { text: "Libraries", path: "/library" },
                        { text: "Favorites", path: "/favorites" },
                      ].map((el) => (
                        <NavLink
                          key={el.text}
                          to={el.path}
                          onClick={() => setBurger(false)}
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "border-b-2 w-full border-b-yellow-700 text-yellow-700"
                                : ""
                            } text-[18px] w-full text-gray-800 mb-2 p-[10px_20px_10px_30px] font-medium transition-all duration-300 ease hover:text-yellow-700`
                          }
                        >
                          {el.text}
                        </NavLink>
                      ))}

                      {isAuth && (
                        <NavLink
                          onClick={() => setBurger(false)}
                          to="/my-books"
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "border-b-2 w-full border-b-yellow-700 text-yellow-700"
                                : ""
                            } text-[18px] w-full text-gray-800 mb-2 p-[10px_20px_10px_30px] font-medium transition-all duration-300 ease hover:text-yellow-700`
                          }
                        >
                          My books
                        </NavLink>
                      )}

                      {!isAuth && (
                        <NavLink
                          onClick={() => setBurger(false)}
                          to="/login"
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "border-b-2 w-full border-b-yellow-700 text-yellow-700"
                                : ""
                            } text-[18px] w-full text-gray-800 mb-2 p-[10px_20px_10px_30px] font-medium transition-all duration-300 ease hover:text-yellow-700`
                          }
                        >
                          Login
                        </NavLink>
                      )}
                    </ul>
                  </nav>
                </div>

                <div className="flex-1" onClick={() => setBurger(false)}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* <button
              onClick={toggleTheme}
              className={`relative rounded-full w-18 h-8 transition-all duration-300 shadow-inner ${
                theme === "light"
                  ? "bg-linear-to-r from-yellow-400 to-orange-400"
                  : "bg-linear-to-r from-slate-700 to-slate-900"
              }`}
              aria-label="Toggle theme"
            >
              <span
                className={`absolute top-1 flex items-center justify-center w-6 h-6 rounded-full shadow-lg transition-all duration-300 ${
                  theme === "light"
                    ? "translate-x-1 bg-white"
                    : "translate-x-11 bg-slate-300"
                }`}
              >
                {theme === "light" ? (
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </span>
            </button> */
