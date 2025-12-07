import { useEffect, useState } from "react";

import useThemeStore from "../store/useThemeStore";

import { useTranslation } from "react-i18next";

import FlagUz from "../assets/icons/flag.png";
import FlagRu from "../assets/icons/russia.png";
import FlagEn from "../assets/icons/usa.png";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const { theme, toggleTheme } = useThemeStore();

  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <section>
      <div className="container">
        <div
          className={`${
            theme == "light"
              ? "bg-white"
              : "bg-transparent border border-gray-800"
          }  max-[600px]:p-3 shadow-2xl p-[25px] rounded-lg`}
        >
          <h2
            className={`${
              theme == "light"
                ? "border-b-gray-300"
                : "text-white border-b-gray-800"
            } text-[35px] border-b font-bold mb-5 pb-5`}
          >
            {t("settings.title")}
          </h2>
          <ul className="">
            <li
              className={`${
                theme == "light"
                  ? "bg-white shadow-2xl "
                  : "shadow-none bg-[#1D202AFF]"
              } flex mb-4 justify-between items-center p-5 rounded-lg `}
            >
              <span
                className={`${
                  theme == "light" ? "" : "text-white"
                } text-[22px]`}
              >
                {t("settings.theme")}
              </span>

              <div
                onClick={() => (theme ? toggleTheme() : "")}
                className={`${
                  theme == "light" ? "bg-gray-200" : "bg-yellow-700"
                }  w-18 flex items-center px-1 rounded-2xl h-8`}
              >
                <div
                  className={`${
                    theme == "light" ? "bg-gray-300" : "translate-x-7 bg-white"
                  }  transition-all duration-300 w-9 h-6 rounded-2xl`}
                ></div>
              </div>
            </li>
            <li
              className={`${
                theme == "light"
                  ? "bg-white shadow-2xl "
                  : "shadow-none bg-[#1D202AFF]"
              } flex mb-4 justify-between items-center p-5 rounded-lg `}
            >
              <span
                className={`${
                  theme == "light" ? "" : "text-white"
                } text-[22px]`}
              >
                {t("settings.language")}
              </span>

              <div className="relative">
                <div className="">
                  <button
                    onClick={() => {
                      langOpen ? setLangOpen(false) : setLangOpen(true);
                    }}
                    className={`flex items-center gap-2 max-[180px] w-full border p-[12px_20px] rounded-lg border-gray-400 `}
                  >
                    <img
                      src={
                        lang == "en"
                          ? FlagEn
                          : lang == "uz"
                          ? FlagUz
                          : lang == "ru"
                          ? FlagRu
                          : ""
                      }
                      alt=""
                      className="w-6 h-6"
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={`${
                          theme == "light" ? "" : "text-white"
                        } text-[16px]`}
                      >
                        {lang == "en"
                          ? "english"
                          : lang == "uz"
                          ? "uzbek"
                          : lang == "ru"
                          ? "russian"
                          : ""}
                      </span>

                      <i
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        } text-[20px]  bi bi-arrow-down-short`}
                      ></i>
                    </div>
                  </button>
                </div>

                {langOpen && (
                  <div
                    className={`${
                      theme == "light"
                        ? "bg-white"
                        : "bg-gray-900 border border-gray-800"
                    } absolute top-14 right-1  shadow-2xl w-[180px] p-2.5 rounded-lg`}
                  >
                    <button
                      onClick={() => {
                        setLang("en");
                        i18n.changeLanguage("en");
                        setLangOpen(false);
                      }}
                      className={`flex items-center gap-6 justify-center p-3 w-full `}
                    >
                      <img src={FlagEn} alt="" className="w-6 h-6" />
                      <span
                        className={`${
                          theme == "light" ? "" : "text-white"
                        } text-[16px]`}
                      >
                        english
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setLang("uz");
                        i18n.changeLanguage("uz");
                        setLangOpen(false);
                      }}
                      className={`flex items-center gap-6 justify-center p-3 w-full`}
                    >
                      <img src={FlagUz} alt="" className="w-6 h-6" />
                      <span
                        className={`${
                          theme == "light" ? "" : "text-white"
                        } text-[16px]`}
                      >
                        uzbek
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setLang("ru");
                        i18n.changeLanguage("ru");
                        setLangOpen(false);
                      }}
                      className={`flex items-center gap-6 justify-center p-3 w-full`}
                    >
                      <img src={FlagRu} alt="" className="w-6 h-6" />
                      <span
                        className={`${
                          theme == "light" ? "" : "text-white"
                        } text-[16px]`}
                      >
                        russian
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
