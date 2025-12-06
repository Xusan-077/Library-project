import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import useAuthStore from "../store/useUserAuth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../../API/API";
import useThemeStore from "../store/useThemeStore";

export default function Header() {
  const [burger, setBurger] = useState(false);

  const { isAuth, setIsAuth, user, setUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

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


  // bg #030712FF
  // card #101828FF
  return (
    <header
      className={`sticky top-0 w-full z-100 border-b ${
        theme === "light"
          ? "bg-white border-b-gray-300 shadow-sm"
          : "bg-[#0A0F18] border-b-gray-800 shadow-md"
      }`}
    >
      <div className="container">
        <div className="flex p-[20px_0] items-center justify-between">
          <Link className="flex items-center gap-2" to="/">
            <img src={Logo} alt="" className="w-10 h-10" />
            <span
              className={` ${
                theme == "light" ? "text-gray-900" : "text-white"
              } text-[25px] font-bold`}
            >
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
                        ? `${
                            theme == "light"
                              ? "border-b-yellow-700 text-yellow-700"
                              : "border-b-white text-white"
                          } border-b-2 `
                        : ""
                    } ${
                      theme == "light"
                        ? "text-gray-800  hover:text-yellow-700"
                        : "text-gray-400 hover:text-white"
                    } text-[18px] pb-2.5 font-medium  transition-all duration-300 ease`
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
                        ? `${
                            theme == "light"
                              ? "border-b-yellow-700 text-yellow-700"
                              : "border-b-white text-white"
                          } border-b-2 `
                        : ""
                    } ${
                      theme == "light"
                        ? "text-gray-800  hover:text-yellow-700"
                        : "text-gray-400 hover:text-white"
                    } text-[18px] pb-2.5 font-medium  transition-all duration-300 ease`
                  }
                >
                  My books
                </NavLink>
              </li>
            )}
          </nav>

          <div className="flex items-center gap-5">
            <div className="max-[850px]:hidden gap-3 flex items-center">
              <div className="">
                <div
                  onClick={() => (theme ? toggleTheme() : "")}
                  className={`${
                    theme == "light" ? "bg-gray-200" : "bg-yellow-700"
                  }  w-18 flex items-center px-1 rounded-2xl h-8`}
                >
                  <div
                    className={`${
                      theme == "light"
                        ? "bg-gray-300"
                        : "translate-x-7 bg-white"
                    }  transition-all duration-300 w-9 h-6 rounded-2xl`}
                  ></div>
                </div>
              </div>
              <div className="">
                {isAuth ? (
                  <div
                    onClick={() => navigate("/profile")}
                    className="flex gap-5 cursor-pointer items-center "
                  >
                    <p className="text-[26px] font-bold">
                      <span
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        } font-semibold`}
                      >
                        welcome user
                      </span>
                    </p>

                    <button className="cursor-pointer">
                      <i
                        className={`${
                          theme == "light" ? "text-gray-600" : "text-white"
                        }  text-[40px] bi bi-person-circle`}
                      ></i>
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
            </div>

            <div
              onClick={() => setBurger(true)}
              className="hidden max-[850px]:block"
            >
              <button className="">
                <i
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } text-[30px] bi bi-list`}
                ></i>
              </button>
            </div>

            {burger && (
              <div className="fixed max-[850px]:flex hidden inset-0 bg-[#0009] z-200 ">
                <div
                  className={`${
                    theme == "light"
                      ? "bg-white"
                      : "bg-[#131A28] border-r border-gray-800"
                  } w-[250px]  p-5 shadow-2xl h-screen`}
                >
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
                        <span className={`font-semibold text-yellow-700`}>
                          Hi ,
                        </span>
                        <span
                          className={
                            theme === "light" ? "text-black" : "text-white pl-2"
                          }
                        >
                          {capitalizedName || "User"}!
                        </span>
                      </p>

                      <button className="cursor-pointer">
                        <i
                          className={`${
                            theme == "light" ? "text-gray-600" : "text-white"
                          }  text-[40px] bi bi-person-circle`}
                        ></i>
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
                            } ${
                              theme == "light" ? "" : "text-white"
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
                            } ${
                              theme == "light" ? "" : "text-white"
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
