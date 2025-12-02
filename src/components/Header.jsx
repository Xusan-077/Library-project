import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import useThemeStore from "../store/useThemeStore";

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();

  const navigate = useNavigate();

  return (
    <header className="border-b border-b-gray-300 shadow-sm">
      <div className="container">
        <div className="flex p-[20px_0] items-center justify-between">
          <Link className="flex items-center gap-2" to="/">
            <img src={Logo} alt="" className="w-[50px] h-[50px]" />
            <span className="text-[35px] font-bold text-gray-900">
              LibraSpace
            </span>
          </Link>

          <nav className="flex items-center">
            {[
              {
                text: "Home",
                path: "/",
              },
              {
                text: "About",
                path: "/about",
              },
              {
                text: "Library",
                path: "/library",
              },
            ].map((el, index) => (
              <li key={index} className="p-[10px_20px]">
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? "border-b-2 border-b-gray-900" : ""
                    } text-[18px] text-gray-800 pb-2.5 font-medium`
                  }
                >
                  {el.text}
                </NavLink>
              </li>
            ))}
          </nav>

          <div className="flex gap-5 items-center">
            <button
              onClick={toggleTheme}
              className={`relative rounded-full w-20 h-10 transition-all duration-300 shadow-inner ${
                theme === "light"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                  : "bg-gradient-to-r from-slate-700 to-slate-900"
              }`}
              aria-label="Toggle theme"
            >
              <span
                className={`absolute top-1 flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all duration-300 ${
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
            </button>
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer text-[18px] font-medium p-[10px_20px] bg-blue-400 text-white rounded-lg"
            >
              Login to Library
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
