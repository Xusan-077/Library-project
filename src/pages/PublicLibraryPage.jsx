import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PublicBooksItem from "../components/PublicBooksItem";
import API from "../../API/API";

import LibraryImg from "../assets/images/publicImg.jpg";
import BookSkleton from "../components/BookSkleton";
import uselikeStore from "../store/useLikeStore";
import useThemeStore from "../store/useThemeStore";

import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { useState } from "react";

export default function PublicLibraryPage() {
  const { theme } = useThemeStore();
  const [location, setLocation] = useState(false);

  const { toggleLibraryLike, likesLibraries } = uselikeStore();
  const params = useParams();

  const { data: library, isLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get(`/libraries/library/${params.libraryId}/`);
      return res.data;
    },
    queryKey: ["library", params.libraryId],
  });

  const libraryData = library?.results?.library;
  const results = library?.results;

  return (
    <section className="">
      <div className="container">
        <div className="">
          <div
            className={` ${
              theme == "light"
                ? "bg-white"
                : "shadow-none border border-gray-800"
            } shadow-2xl rounded-lg p-[25px] mb-[30px]`}
          >
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-b-gray-300">
              <h2
                className={`${
                  theme == "light" ? "" : "text-white"
                } text-[35px] font-bold`}
              >
                Library
              </h2>
              <button
                className="text-[20px] cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLibraryLike(libraryData);
                }}
              >
                {likesLibraries.find((el) => el.id === libraryData?.id) ? (
                  <i className="text-red-500 text-[30px] bi bi-heart-fill"></i>
                ) : (
                  <i
                    className={`${
                      theme == "light" ? "text-black" : "text-white"
                    }  text-[30px] bi bi-heart`}
                  ></i>
                )}
              </button>
            </div>

            <div className="flex items-center gap-5 mt-5 max-[650px]:block">
              {isLoading ? (
                <>
                  <div className="w-[300px] h-[300px] rounded-lg bg-gray-200"></div>
                  <div className="">
                    <div className="w-20 mb-6 h-5 rounded-lg bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                    <div className="w-40 mb-4 rounded-lg h-5 bg-gray-200"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <img
                      src={LibraryImg}
                      alt={libraryData?.name || "Library"}
                      className="w-[300px] h-[300px] rounded-lg max-[650px]:w-full max-[650px]:mb-5"
                    />

                    {location && (
                      <div className="fixed bg-[#0005] inset-0 z-100 flex items-center justify-center ">
                        <div
                          className={`${
                            theme == "light"
                              ? "bg-white  border-gray-300"
                              : " bg-[#030712FF] border-gray-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                          }  rounded-lg max-w-[800px] border p-[25px] w-full shadow-2xl`}
                        >
                          <div className="flex items-center justify-between border-b border-b-yellow-700 mb-2.5 pb-2.5">
                            <span className="text-yellow-700 text-[20px] font-semibold">
                              Location
                            </span>
                            <span
                              onClick={() => setLocation(false)}
                              className={`${
                                theme == "light" ? "" : "text-white"
                              } text-[30px] font-semibold cursor-pointer`}
                            >
                              &times;
                            </span>
                          </div>
                          <div className="w-full h-[300px]">
                            {!library ? (
                              <div className="w-full h-[300px] bg-gray-300"></div>
                            ) : (
                              <YMaps
                                query={{
                                  apikey:
                                    "bc32072f-a50d-4f7e-b22c-a4b70bba1202",
                                }}
                              >
                                <Map
                                  className="w-full h-full"
                                  state={{
                                    center: [
                                      library?.results?.library?.latitude,
                                      library?.results?.library?.longitude,
                                    ],
                                    zoom: 15,
                                  }}
                                >
                                  <Placemark
                                    geometry={[
                                      library?.results?.library?.latitude,
                                      library?.results?.library?.longitude,
                                    ]}
                                  />
                                  <FullscreenControl />
                                  <ZoomControl options={{ float: "right" }} />
                                </Map>
                              </YMaps>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="">
                    <h3
                      className={`${
                        theme == "light" ? "" : "text-white"
                      }  text-[18px] font-semibold mb-3`}
                    >
                      #{libraryData?.user || "Unknown User"}
                    </h3>

                    <div className="mb-3 flex gap-2 items-center">
                      <i className="text-yellow-600 bi bi-book"></i>
                      <span
                        className={`${
                          theme == "light" ? "" : "text-gray-400"
                        } `}
                      >
                        Total Books:
                      </span>
                      <p
                        className={`${
                          theme == "light" ? "" : "text-white"
                        }  text-[18px] font-medium`}
                      >
                        {results?.total_books ?? 0}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center mb-3">
                      <i className="text-yellow-600 bi bi-geo-alt"></i>
                      <p
                        className={`${
                          theme == "light" ? "" : "text-white"
                        }  text-[16px] font-normal max-w-[300px]`}
                      >
                        {libraryData?.address || "Address not available"}
                      </p>
                    </div>

                    <div className="mb-3 flex gap-2 items-center">
                      <i className="text-yellow-600 bi bi-telephone-inbound"></i>
                      {results?.phone ? (
                        <a
                          className={`${
                            theme == "light" ? "" : "text-white"
                          }  underline font-medium text-[18px]`}
                          href={`tel:${results.phone}`}
                        >
                          {results.phone}
                        </a>
                      ) : (
                        <span className="text-[18px] font-medium">
                          No phone
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[18px] font-medium  flex gap-2 items-center">
                        {results?.is_active ? (
                          <div className="bg-green-500 text-white rounded-lg p-[5px_15px] w-[100px] text-center">
                            Active
                          </div>
                        ) : (
                          <div className="bg-red-500 text-white rounded-lg p-[5px_15px] w-[130px] text-center">
                            Not active
                          </div>
                        )}
                      </span>
                      <button
                        onClick={() => setLocation(true)}
                        className="text-[18px] bg-yellow-700 text-white rounded-lg cursor-pointer w-full p-[5px_15px]"
                      >
                        See location
                      </button>
                    </div>

                    <span
                      className={`${
                        libraryData?.can_rent_books
                          ? "bg-green-600"
                          : "bg-red-600"
                      } text-white text-[16px] block mb-3 text-center rounded-lg  p-[10px_20px]`}
                    >
                      {libraryData?.can_rent_books ? "can rent" : "cannot rent"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "shadow-none border-gray-800 border"
            }  max-[375px]:p-2.5 p-[25px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg`}
          >
            <h2
              className={`${
                theme == "light" ? "" : "text-white"
              } text-[30px] mb-[30px] font-bold`}
            >
              Books
            </h2>
            <ul
              className={`${
                results?.books?.length || isLoading
                  ? "grid grid-cols-4 gap-6 max-[1140px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
                  : ""
              }`}
            >
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <BookSkleton key={index} full />
                ))
              ) : results?.books?.length ? (
                results.books.map((el, index) => (
                  <PublicBooksItem
                    index={index}
                    book={el}
                    key={el.id || index}
                    {...el}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <i className="bi bi-book text-gray-400 text-6xl mb-4"></i>
                  <p className="text-[26px] font-semibold text-red-500">
                    No books found
                  </p>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
