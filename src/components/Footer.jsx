import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import useThemeStore from "../store/useThemeStore";

export default function Footer() {
  const { theme } = useThemeStore();

  return (
    <footer
      className={`${
        theme == "light"
          ? "bg-white border-gray-200"
          : "bg-[#030712] border-t-gray-800"
      }  border-t  py-12`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link className="flex items-center gap-2 mb-3" to="/">
              <img src={Logo} alt="" className="w-[50px] h-[50px]" />
              <span className="text-[35px] font-bold text-white">
                LibraSpace
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              O'zbekistonning eng yirik kutubxona tarmog'i
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              Tezkor havolalar
            </h3>
            <ul className="space-y-2 text-sm">
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
                <li key={index} className="p-2.5">
                  <Link to={el.path} className="text-gray-400 text-[16px]">
                    {el.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              Bog'lanish
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="tel:+998901234567"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  +998 93 164 03 49
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ezma.uz"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  xusanyarashvo1@gmail.com
                </a>
              </li>
              <li>Toshkent shahri, Sergeli tumani</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              Ijimoiy tarmoqlar
            </h3>
            <div className="flex gap-4 text-sm max-[870px]:flex-col ">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <p>© 2024 EZMA. Barcha huquqlar himoyalangan</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Maxfiylik siyosati
              </a>
              <a
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Foydalanish shartlari
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
