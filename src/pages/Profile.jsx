import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/useUserAuth";
import { useState } from "react";
import PublicBooksItem from "../components/PublicBooksItem";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const [logOutModal, setLogOurModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const [activeTab, setActiveTab] = useState("books");
  const navigate = useNavigate();

  const { user, logOut } = useAuthStore();

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
      {logOutModal && (
        <div className="fixed p-[0_20px] w-screen h-screen inset-0 bg-[#0009] flex items-center justify-center z-100">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-[400px] w-full">
            <h2 className="text-[18px] font-bold mb-4 text-yellow-700">
              Confirm Log out
            </h2>
            <p className="mb-6 text-center text-[20px] font-semibold">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  logOut();

                  toast.success("success log out");
                }}
              >
                Yes
              </button>
              <button
                className="px-6 py-1 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setLogOurModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {edit && (
        <div className="fixed p-[0_20px] w-screen h-screen inset-0 bg-[#0009] flex items-center justify-center z-100">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-[600px] w-full">
            <div className="flex pb-1 mb-1 border-b border-b-gray-300 justify-between">
              <h3 className="text-[20px] font-semibold text-yellow-700">
                Edit Profile
              </h3>
              <span
                onClick={() => setEdit(false)}
                className="text-[26px] cursor-pointer"
              >
                &times;
              </span>
            </div>

            <form className="">
              <div className="mt-10 border-b pb-5 border-b-gray-200 mb-5">
                <p className="flex gap-3 items-center mb-5">
                  <i className="text-yellow-700 bi bi-map"></i>
                  <span className="text-[14px] font-medium">Location</span>
                </p>
                <div className="flex items-center gap-3 border-gray-300 border  p-[0_0_0_20px] rounded-lg">
                  <span className="">
                    <i className="text-yellow-700 bi bi-geo-alt"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className="w-full h-[50px] border-none outline-none border"
                  />
                </div>
              </div>
              <div className="mt-10 border-b pb-5 border-b-gray-200 mb-5">
                <p className="flex gap-3 items-center mb-5">
                  <i className="text-yellow-700 bi bi-sliders"></i>
                  <span className="text-[14px] font-medium">Location</span>
                </p>
                <select className="border w-full shadow-sm border-gray-300 rounded p-3">
                  <option disabled value="choose">
                    Choose one
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mt-10 border-b pb-5 border-b-gray-200 mb-5">
                <p className="flex gap-3 items-center mb-5">
                  <i className="text-yellow-700 bi bi-server"></i>
                  <span className="text-[14px] font-medium">Networks</span>
                </p>
                <div className="">
                  <span className="border mb-2.5 h-[50px] w-full rounded-lg p-[0_0_0_20px] border-gray-200 flex items-center gap-2">
                    <span className="">
                      <i className="text-yellow-700 bi bi-instagram"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Instagram"
                      className="outline-none"
                    />
                  </span>
                  <span className="border mb-2.5 h-[50px] w-full rounded-lg p-[0_0_0_20px] border-gray-200 flex items-center gap-2">
                    <span className="">
                      <i className="text-yellow-700 bi bi-facebook"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Facebook"
                      className="outline-none"
                    />
                  </span>
                  <span className="border mb-2.5 h-[50px] w-full rounded-lg p-[0_0_0_20px] border-gray-200 flex items-center gap-2">
                    <span className="">
                      <i className="text-yellow-700 bi bi-telegram"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Telegram"
                      className="outline-none"
                    />
                  </span>
                </div>
              </div>
              <div className="">
                <button
                  type="button"
                  className="bg-yellow-700 rounded-xl text-[18px] text-white p-[10px_20px]"
                >
                  choose Location on map
                </button>
              </div>

              <div className="flex justify-end items-center gap-2 mt-10">
                <button
                  type="button"
                  className="p-[8px_0] max-w-[130px] border cursor-pointer border-gray-300 rounded-lg text-gray-800 w-full text-[16px] "
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="p-[8px_0] max-w-[100px] w-full text-[16px] cursor-pointer bg-yellow-700 rounded-lg text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="container">
        <div className="m-[50px_0]">
          <div className="flex relative items-center mb-[30px] gap-[30px] bg-white p-5 rounded-lg shadow-2xl">
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
                <a
                  className="underline text-[18px]"
                  href={`tel:${user?.user?.phone}`}
                >
                  {user?.user?.phone}
                </a>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-bookmarks"></i>
                <button
                  className={`${
                    user?.can_rent_books ? "bg-green-600" : "bg-red-600"
                  } text-white text-[16px] rounded-lg  p-[5px_20px]`}
                >
                  {user?.can_rent_books ? "can rent" : "cannot rent"}
                </button>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-house-door"></i>
                <p className="text-[18px] font-medium">{user?.address}</p>
              </div>
            </div>
            <div className="group transition-all duration-300">
              <div
                className="absolute top-[25px] right-[25px] h-10 w-[50px] 
                flex justify-center items-center 
                border border-yellow-700 rounded-lg 
                cursor-pointer transition-all duration-300 hover:bg-yellow-700"
              >
                <i className="bi bi-gear text-[20px] text-yellow-700 hover:text-white"></i>
              </div>

              <div className="w-[200px] h-[140px] group-hover:flex items-center top-13 -right-5 absolute hidden">
                <div
                  className=" bg-white shadow-2xl 
                  p-2.5 rounded-lg max-w-[150px] w-full 
                 "
                >
                  <button
                    onClick={() => setEdit(true)}
                    className="cursor-pointer flex mb-3 text-yellow-700 text-[18px] font-semibold items-center gap-3"
                  >
                    <i className="bi bi-pencil-square"></i>
                    <span className="">Edit</span>
                  </button>
                  <button
                    onClick={() => setLogOurModal(true)}
                    className="cursor-pointer flex text-red-500 text-[18px] font-semibold items-center gap-3"
                  >
                    <i className="bi bi-box-arrow-left"></i>
                    <span className="">Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 min-h-[450px] rounded-lg shadow-2xl">
            <div>
              <div className="flex border-b pb-2.5 border-b-gray-100">
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
                    <h2 className="pb-2.5 border-b-gray-300 border-b text-[30px] font-semibold m-[20px_0_10px_20px]">
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
                      <h2 className="pb-2.5 border-b-gray-300 border-b text-[30px] font-semibold m-[20px_0_10px_20px]">
                        My NetWorks
                      </h2>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            navigate(`https://${user?.social_media?.instagram}`)
                          }
                          className="flex gap-2 p-[10px_20px]"
                        >
                          <i className="text-yellow-700 bi bi-instagram"></i>
                          <span>instagram</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`https://${user?.social_media?.facebook}`)
                          }
                          className="flex gap-2 p-[10px_20px]"
                        >
                          <i className="text-yellow-700 bi bi-facebook"></i>
                          <span>facebook</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`https://${user?.social_media?.telegram}`)
                          }
                          className="flex gap-2 p-[10px_20px]"
                        >
                          <i className="text-yellow-700 bi bi-telegram"></i>
                          <span>telegram</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "map" && (
                  <div className="">
                    <h2 className="pb-2.5 border-b-gray-300 border-b text-[30px] font-semibold m-[20px_0_10px_20px]">
                      My Location
                    </h2>

                    <div className="flex gap-5 items-center p-5">
                      <i className="text-yellow-700 bi bi-geo-alt"></i>
                      <span className="">{user?.address}</span>
                    </div>
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
