import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../API/API";

import LibraryImg from "../assets/images/publicImg.jpg";
import uselikeStore from "../store/useLikeStore";
import useThemeStore from "../store/useThemeStore";
import { useTranslation } from "react-i18next";

export default function Library() {
  const [format, setFormat] = useState("grid");
  const [sort, setSort] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();

  const { toggleLibraryLike, likesLibraries } = uselikeStore();
  const { theme } = useThemeStore();

  const navigate = useNavigate();

  const { data: libraries, isLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res;
    },
    queryKey: ["libraries"],
  });

  const filteredAndSortedLibraries = useMemo(() => {
    if (!libraries?.data) return [];

    let result = [...libraries.data];

    if (searchQuery) {
      result = result.filter(
        (lib) =>
          lib.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lib.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "books-desc":
        result.sort((a, b) => (b.total_books || 0) - (a.total_books || 0));
        break;
      case "books-asc":
        result.sort((a, b) => (a.total_books || 0) - (b.total_books || 0));
        break;
      default:
        break;
    }

    return result;
  }, [libraries?.data, sort, searchQuery]);

  return (
    <section className={`${theme == "light" ? "bg-gray-50" : "bg-[#0A0F18]"}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`${
            theme == "light" ? "" : "text-white"
          } text-[35px] font-bold mb-5`}
        >
          {t("libraries.title")}
        </h2>
        <div className="grid grid-cols-[280px_1fr] max-[725px]:grid-cols-1 items-start gap-[30px]">
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#131A28]"
            } sticky max-[725px]:static  top-[120px] shadow-2xl rounded-lg p-[15px_15px_30px_15px] flex flex-col gap-2`}
          >
            {[
              {
                id: "name-asc",
                label: "Name (A-Z)",
                icon: "bi-sort-alpha-down",
              },
              {
                id: "name-desc",
                label: "Name (Z-A)",
                icon: "bi-sort-alpha-down-alt",
              },
              {
                id: "books-desc",
                label: "Books (desc)",
                icon: "bi-sort-numeric-down",
              },
              {
                id: "books-asc",
                label: "Books (asc)",
                icon: "bi-sort-numeric-up",
              },
            ].map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <i className={`text-yellow-600 bi ${option.icon}`}></i>
                <button
                  onClick={() => setSort(option.id)}
                  className={`
    w-full text-left rounded-lg p-[5px_10px_5px_15px] text-[16px] border cursor-pointer transition-all
    ${
      theme === "light"
        ? "border-gray-300 text-[#000000d9]"
        : "border-gray-600 text-white"
    }
    ${
      sort === option.id
        ? theme === "light"
          ? "bg-yellow-600 font-medium text-[#f9f9f9]"
          : "bg-[#334378] font-medium text-[#f9f9f9]"
        : theme === "light"
        ? "bg-gray-200 hover:bg-gray-300"
        : "bg-[#131A28] hover:bg-gray-700"
    }
  `}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>

          <div>
            <div
              className={`${
                theme == "light" ? "bg-white" : "bg-[#131A28]"
              } mb-[30px]  rounded-lg shadow-2xl`}
            >
              <div className="flex items-center max-[800px]:gap-5 justify-between p-[10px_20px] max-[425px]:block">
                <div
                  className={`${
                    theme == "light" ? "border-gray-300" : "border-gray-400"
                  } flex items-center rounded-lg p-[0_0_0_20px] max-[425px]:mb-3 max-[425px]:max-w-full max-w-[300px] w-full gap-3 border`}
                >
                  <i className="text-gray-600 bi bi-search"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${
                      theme == "light"
                        ? "text-gray-600"
                        : "placeholder:text-gray-300 text-gray-300"
                    } outline-none rounded-lg  h-10 w-full`}
                    placeholder={t("libraries.search")}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 pr-2"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <div className="flex gap-2 rounded-lg">
                  <button
                    onClick={() => setFormat("grid")}
                    className={`px-4 py-2 max-[425px]:w-full  max-[425px]:flex  max-[425px]:justify-center rounded-md transition-colors ${
                      format === "grid"
                        ? "bg-[#FD7401] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setFormat("list")}
                    className={`px-4 py-2  max-[425px]:w-full  max-[425px]:flex  max-[425px]:justify-center rounded-md transition-colors ${
                      format === "list"
                        ? "bg-[#FD7401] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <ul
              className={`${
                format === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              } transition-all duration-200`}
            >
              {isLoading && format == "grid"
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-2xl">
                      <div className="w-full h-48 bg-gray-200 rounded-lg"></div>

                      <div className="p-4">
                        <div className="mb-5">
                          <div className="w-[200px] h-6 rounded-lg bg-gray-200 mb-0.5"></div>
                          <div className="w-[100px] h-6 rounded-lg bg-gray-200 mb-2.5"></div>
                        </div>
                        <div className="w-40 h-6 rounded-lg bg-gray-200 mb-2.5"></div>
                        <div className="w-[120px] h-6 rounded-lg bg-gray-200 mb-2.5"></div>
                        <div className="w-[100px] h-6 rounded-lg bg-gray-200 mb-2.5"></div>
                      </div>
                    </div>
                  ))
                : isLoading && format == "list"
                ? ""
                : filteredAndSortedLibraries.map((library) =>
                    format === "grid" ? (
                      <li
                        onClick={() => navigate(`/library/${library.id}`)}
                        key={library.id}
                        className={`${
                          theme == "light"
                            ? "bg-white"
                            : "bg-[#1D202AFF] border-gray-800"
                        }  relative cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden`}
                      >
                        <div className="cursor-pointer absolute right-5 bottom-4">
                          <button
                            className="text-[20px] text-white"
                            onClick={(e) => {
                              e.stopPropagation();

                              toggleLibraryLike(library);
                            }}
                          >
                            {likesLibraries.find(
                              (el) => el.id === library.id
                            ) ? (
                              <i className="text-red-500 bi bi-heart-fill"></i>
                            ) : (
                              <i
                                className={`${
                                  theme == "light"
                                    ? "text-black"
                                    : "text-white "
                                }  bi bi-heart`}
                              ></i>
                            )}
                          </button>
                        </div>
                        <img
                          src={LibraryImg}
                          alt={library.name || "Library"}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {t("libraries.cardName")}:
                            </span>
                            <br />
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-white"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {library.name}
                            </span>
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {t("libraries.location")}:
                            </span>
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-200"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {library.address || "Address not available"}
                            </span>
                          </p>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {t("libraries.quality")}:
                            </span>
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-200"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {library.total_books || "books not yet"}
                            </span>
                          </p>
                          {library.books_count !== undefined && (
                            <p className="text-gray-600 text-sm mb-3">
                              <span className="text-gray-800 text-[16px] mr-2 font-bold">
                                Books:
                              </span>
                              {library.books_count}
                            </p>
                          )}
                          <span className="text-gray-600 text-sm">
                            {library.is_active ? (
                              <div
                                className={` bg-green-500 text-white text-center p-[5px_0] rounded-lg w-[100px]`}
                              >
                                Active
                              </div>
                            ) : (
                              <div className="bg-red-500 text-center p-[5px_0] rounded-lg text-white w-[100px]">
                                Not active
                              </div>
                            )}
                          </span>
                        </div>
                      </li>
                    ) : (
                      <li
                        onClick={() => navigate(`/library/${library.id}`)}
                        key={library.id}
                        className={`${
                          theme == "light"
                            ? "bg-white"
                            : "bg-[#1D202AFF] border-gray-800"
                        }  max-[450px]:block relative rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow overflow-hidden flex items-center`}
                      >
                        <img
                          src={LibraryImg}
                          alt={library.name || "Library"}
                          className="w-[250px] max-[450px]:w-full max-[450px]:p-[0_20px] max-[450px]:h-[200px] max-[500px]:h-[170px] max-[500px]:w-[180px]  h-[220px] object-cover"
                        />
                        <div className="cursor-pointer absolute right-5 top-4">
                          <button
                            className="text-[20px] text-white"
                            onClick={(e) => {
                              e.stopPropagation();

                              toggleLibraryLike(library);
                            }}
                          >
                            {likesLibraries.find(
                              (el) => el.id === library.id
                            ) ? (
                              <i
                                className={`${
                                  theme == "light"
                                    ? "text-red-500"
                                    : "text-red-500 "
                                } bi bi-heart-fill`}
                              ></i>
                            ) : (
                              <i
                                className={`${
                                  theme == "light"
                                    ? "text-black"
                                    : "text-white "
                                }  bi bi-heart`}
                              ></i>
                            )}
                          </button>
                        </div>
                        <div className="p-4 flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {t("libraries.cardName")}:
                            </span>
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-200"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {library.name}
                            </span>
                          </h3>
                          <div className="text-gray-600 flex text-sm mb-3">
                            <span
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } text-[16px] mr-2 font-bold`}
                            >
                              {t("libraries.location")}:
                            </span>
                            <p
                              className={`${
                                theme == "light"
                                  ? "text-gray-800 "
                                  : "text-gray-200"
                              } text-[16px] mr-2 font-bold line-clamp-2`}
                            >
                              {library.address || "Address not available"}
                            </p>
                          </div>
                          {library.books_count !== undefined && (
                            <p className="text-gray-600 text-sm mb-3">
                              <span className="text-gray-800 text-[16px] mr-2 font-bold">
                                Books:
                              </span>
                              <span className="">{library.books_count}</span>
                            </p>
                          )}
                          <span className="text-gray-600 text-sm">
                            {library.is_active ? (
                              <div className="bg-green-500 text-center p-[5px_0] rounded-lg text-white w-[100px]">
                                Active
                              </div>
                            ) : (
                              <div className="bg-red-500 text-center p-[5px_0] rounded-lg text-white w-[100px]">
                                Not active
                              </div>
                            )}
                          </span>
                        </div>
                      </li>
                    )
                  )}
            </ul>

            {!isLoading && filteredAndSortedLibraries.length === 0 && (
              <div className="text-center py-12">
                {searchQuery ? (
                  <>
                    <i className="bi bi-search text-gray-400 text-6xl mb-4"></i>
                    <p className="text-gray-600 text-lg mb-2">
                      No libraries found for "{searchQuery}"
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[#FD7401] hover:underline"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <i className="bi bi-building text-gray-400 text-6xl mb-4"></i>
                    <p className="text-gray-600 text-lg">No libraries found</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
