import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import useThemeStore from "../store/useThemeStore";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
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
              {t("footer.brand.slogan")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              {t("footer.links.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { text: t("footer.links.home"), path: "/" },
                { text: t("footer.links.books"), path: "/books" },
                { text: t("footer.links.libraries"), path: "/library" },
                { text: t("footer.links.favorites"), path: "/favorites" },
              ].map((el, index) => (
                <li key={index} className="p-2.5">
                  <Link to={el.path} className="text-gray-400 text-[16px]">
                    {el.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="tel:+998931640349"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {t("footer.contact.phone")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:xusanyarashvo1@gmail.com"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {t("footer.contact.email")}
                </a>
              </li>
              <li>{t("footer.contact.address")}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4 dark:text-white">
              {t("footer.social.title")}
            </h3>
            <div className="flex gap-4 text-sm max-[870px]:flex-col ">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {t("footer.social.facebook")}
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {t("footer.social.instagram")}
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {t("footer.social.youtube")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <p>{t("footer.bottom.copyright")}</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {t("footer.bottom.privacy")}
              </a>
              <a
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {t("footer.bottom.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
