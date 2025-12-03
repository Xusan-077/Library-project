import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import { useState } from "react";

import LibraryImg from "../assets/images/publicImg.jpg";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [format, setFormat] = useState("grid");

  const [sort, setSort] = useState("name-asc");

  const naviaget = useNavigate();

  const { data: libraries, isLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res;
    },
    queryKey: ["libraries"],
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-[30px]">
          List of libraries
        </h2>
        <div className="grid grid-cols-[280px_1fr] items-start gap-[30px]">
          <div className="sticky top-[100px]  bg-white shadow-2xl rounded-lg p-[15px_15px_30px_15px] flex flex-col gap-2">
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
                icon: "bi-sort-up-alt",
              },
              { id: "books-asc", label: "Books (asc)", icon: "bi-sort-up" },
            ].map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <i className={`text-yellow-600 bi ${option.icon}`}></i>
                <button
                  onClick={() => setSort(option.id)}
                  className={`bg-gray-200 border cursor-pointer border-gray-300 text-[#000000d9] rounded-lg p-[5px_10px_5px_15px] text-[16px] w-full text-left
              ${
                sort === option.id
                  ? "bg-yellow-600 font-medium text-[#f9f9f9]"
                  : ""
              }`}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
          <div className="">
            <div className="mb-[30px] bg-white rounded-lg shadow-2xl">
              <div className="flex items-center justify-between p-[10px_20px]">
                <div className="flex items-center rounded-lg p-[0_0_0_20px] roundeFd-lg max-w-[300px] w-full gap-3 border border-gray-300">
                  <i className="text-gray-600 bi bi-search"></i>
                  <input
                    type="text"
                    className="outline-none rounded-lg text-gray-600 h-10 "
                    placeholder="search your library"
                  />
                </div>
                <div className="flex gap-2 rounded-lg">
                  <button
                    onClick={() => setFormat("grid")}
                    className={`px-4 py-2 rounded-md transition-colors ${
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
                    className={`px-4 py-2 rounded-md transition-colors ${
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

            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD7401]"></div>
                <p className="mt-4 text-gray-600">Loading libraries...</p>
              </div>
            )}

            {!isLoading && (
              <ul
                className={`${
                  format === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                } transition-all duration-200`}
              >
                {libraries?.data?.map((el, index) =>
                  format === "grid" ? (
                    <li
                      onClick={() => naviaget(`/library/${el.id}`)}
                      key={index}
                      className="bg-white cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <img
                        src={LibraryImg}
                        alt={el.name || "Library"}
                        className="w-full h-65 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                          <span className="text-gray-800 text-[16px] mr-2 font-bold">
                            Library name :
                          </span>
                          {el.name || "Library Name"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          <span className="text-gray-800 text-[16px] mr-2 font-bold">
                            location:
                          </span>
                          {el.address || "Address not available"}
                        </p>
                        <span className="text-gray-600 text-sm mb-3">
                          {el.is_active ? (
                            <div className="bg-green-500 text-center p-[5px_0] rounded-lg text-white w-[100px] block">
                              Active
                            </div>
                          ) : (
                            <div className="bg-red-500 text-center p-[5px_0] rounded-lg text-white w-[100px] block">
                              Not active
                            </div>
                          )}
                        </span>
                      </div>
                    </li>
                  ) : (
                    <li
                      onClick={() => naviaget(`/library/${el.id}`)}
                      key={index}
                      className="bg-white rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow overflow-hidden flex items-center"
                    >
                      <img
                        src={LibraryImg}
                        alt={el.name || "Library"}
                        className="w-[250px] h-[220px] object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          <span className="text-gray-800 text-[16px] mr-2 font-bold">
                            Library name :
                          </span>
                          {el.name || "Library Name"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          <span className="text-gray-800 text-[16px] mr-2 font-bold">
                            location:
                          </span>
                          {el.address || "Address not available"}
                        </p>
                        <span className="text-gray-600 text-sm mb-3">
                          {el.is_active ? (
                            <div className="bg-green-500 text-center p-[5px_0] rounded-lg text-white w-[100px] block">
                              Active
                            </div>
                          ) : (
                            <div className="bg-red-500 text-center p-[5px_0] rouFnded-lg text-white w-[100px] block">
                              Not active
                            </div>
                          )}
                        </span>
                      </div>
                      <div className="pr-4"></div>
                    </li>
                  )
                )}
              </ul>
            )}

            {!isLoading && libraries?.data?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No libraries found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
