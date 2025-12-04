import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/useUserAuth";
import { useState } from "react";
import PublicBooksItem from "../components/PublicBooksItem";
import API from "../../API/API";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("books");

  const { user } = useAuthStore();

  const accessToken = localStorage.getItem("access");

  const { data: myBooks, isLoading } = useQuery({
    queryFn: async () => {
      const res = API.get("/libraries/library/books", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res;
    },
    queryKey: ["myBooks"],
    enabled: !!accessToken,
  });

  return (
    <div className="">
      <div className="container">
        <div className="m-[50px_0]">
          <div className="flex items-center mb-[30px] gap-[30px] bg-white p-5 rounded-lg shadow-2xl">
            <div className="bg-[#CCCCCCFF] rounded-lg flex justify-center items-center w-[250px] h-[250px]">
              <i className="text-[100px] text-white bi bi-person-circle"></i>
            </div>
            <div className="">
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-person"></i>
                <h2 className="text-[30px] font-semibold">
                  {user?.user?.name}
                </h2>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-telephone"></i>
                <h2 className="underline text-[18px]">{user?.user?.phone}</h2>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-bookmarks"></i>
                <button
                  className={`${
                    user?.can_rent_books ? "bg-green-600" : "bg-red-600"
                  } text-white text-[16px] rounded-lg  p-[5px_20px]`}
                >
                  {user?.can_rent_books ? "beradi" : "bermidi"}
                </button>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-house-door"></i>
                <p className="text-[18px] font-medium">{user?.address}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 min-h-[450px] rounded-lg shadow-2xl">
            <div>
              <div className="flex">
                <button
                  className={`pb-2 ${
                    activeTab === "books" ? "border-b-2 border-yellow-700" : ""
                  } flex gap-5 p-[10px_0] max-w-[200px] justify-center w-full`}
                  onClick={() => setActiveTab("books")}
                >
                  <i className="text-yellow-700 bi bi-journal-bookmark"></i>
                  <span className="">My Books</span>
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "network"
                      ? "border-b-2 border-yellow-700"
                      : ""
                  } flex gap-5 p-[10px_0] max-w-[200px] justify-center w-full`}
                  onClick={() => setActiveTab("network")}
                >
                  <i className="text-yellow-700 bi bi-share"></i>
                  <span className="">My networks</span>
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "map" ? "border-b-2 border-yellow-700" : ""
                  } flex gap-5 p-[10px_0] max-w-[200px] justify-center w-full`}
                  onClick={() => setActiveTab("map")}
                >
                  <i className="text-yellow-700 bi bi-geo-alt"></i>
                  <span className="">My Location</span>
                </button>
              </div>

              <div className="mt-4">
                {activeTab === "books" && (
                  <div>
                    <h2 className="text-[30px] font-semibold m-[20px_0_10px_20px]">
                      My Books
                    </h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                      {isLoading
                        ? Array.from({ length: 12 }).map((_, index) => (
                            <li key={index} className="min-w-[250px]">
                              <div className="mb-3 rounded-lg bg-gray-200 h-[280px]"></div>

                              <div className="px-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                              </div>
                            </li>
                          ))
                        : myBooks?.data?.map((book, index) => (
                            <PublicBooksItem
                              index={index}
                              book={book}
                              library
                              key={book.id}
                              {...book}
                            />
                          ))}
                    </ul>
                  </div>
                )}

                {activeTab === "network" && (
                  <div>
                    <div className="">
                      <h2 className="text-[30px] font-semibold m-[20px_0_10px_20px]">
                        My NetWorks
                      </h2>
                    </div>
                  </div>
                )}
                {activeTab === "map" && (
                  <div className="">
                    <h2 className="text-[30px] font-semibold m-[20px_0_10px_20px]">
                      My Location
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
