import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/useUserAuth";
import { useEffect, useState } from "react";
import PublicBooksItem from "../components/PublicBooksItem";
import { AuthAPI } from "../../API/API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useThemeStore from "../store/useThemeStore";
import { useTranslation } from "react-i18next";
import { queryClient } from "../main";

import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";

export default function Profile() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [logOutModal, setLogOurModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const [activeTab, setActiveTab] = useState("books");

  const { user, logOut, setUser } = useAuthStore();
  const { theme } = useThemeStore();

  const accessToken = localStorage.getItem("access");

  const navigate = useNavigate();

  const { data: userAction } = useQuery({
    queryFn: async () => {
      const res = await AuthAPI.get("/auth/profile/");

      return res.data;
    },
    queryKey: ["userData"],
    enabled: !!accessToken,
  });

  useEffect(() => {
    setUser(userAction);
  }, [userAction]);

  const [chooseLocation, setChooseLocation] = useState(false);
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");

  // form

  const schema = yup.object({
    user: yup.object({
      name: yup.string().required("Name is required"),
    }),
    library: yup.object({
      social_media: yup.object({
        instagram: yup.string().required("Instagram is required"),
        facebook: yup.string().required("Facebook is required"),
        telegram: yup.string().required("Telegram is required"),
      }),
    }),
    address: yup.string().required("Address is required"),
    can_rent_books: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      address: user?.address,
      latitude: user?.latitude,
      longitude: user?.longitude,
    },
    resolver: yupResolver(schema),
  });

  async function handleClick(e) {
    const c = e.get("coords");
    setCoords(c);

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=bc32072f-a50d-4f7e-b22c-a4b70bba1202&geocode=${c[1]},${c[0]}&format=json&results=1&kind=house&lang=en_US`
      );

      const data = await response.json();

      const address =
        data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.text;

      setAddress(address);

      return address ?? `${c[0].toFixed(6)}, ${c[1].toFixed(6)}`;
    } catch (error) {
      toast.warn("Failed to catch location:", error.message);
      return;
    }
  }

  // form

  const { data: myBooks, isLoading } = useQuery({
    queryFn: async () => {
      const res = AuthAPI.get("/libraries/library/books");

      return res;
    },
    queryKey: ["myBooks"],
    enabled: !!accessToken,
  });

  const { mutate: EditProfile } = useMutation({
    mutationFn: async (body) => {
      const res = AuthAPI.patch(`/auth/profile/`, body);

      return res;
    },
    onSuccess: () => {
      toast.success("Profile edit success", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });

      queryClient.invalidateQueries();

      setEdit(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed profile edit", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
    },
  });

  function handleEditSubmit(data) {
    EditProfile(data);

    queryClient.invalidateQueries();
  }

  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(8);

  const start = pageNum * pageSize;
  const end = start + pageSize;

  const pagination = myBooks?.data.slice(start, end);

  const totalPages = Math.ceil((myBooks?.data.length || 0) / pageSize);

  return (
    <div className="">
      {logOutModal && (
        <div className="fixed p-[0_20px] w-screen h-screen inset-0 bg-[#0009] flex items-center justify-center z-100">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border border-gray-800"
            } rounded-lg shadow-lg p-6 max-w-[400px] w-full`}
          >
            <h2
              className={`${
                theme == "light" ? "border-b-gray-300" : "border-b-gray-800"
              } text-[18px] font-bold border-b mb-5 pb-5 text-yellow-700`}
            >
              Confirm Log out
            </h2>
            <p
              className={`${
                theme == "light" ? "" : "text-gray-300"
              } mb-6 text-center text-[20px] font-semibold`}
            >
              Are you sure to to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  logOut();

                  toast.success("success log out", {
                    className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
                    bodyClassName: "text-sm sm:text-base md:text-lg",
                  });
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
        <div className="fixed max-[425px]:p-0 p-[0_20px] w-screen h-screen inset-0 bg-[#0009] flex items-center justify-center z-100">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border border-gray-800"
            } max-[425px]:w-full max-[425px]:rounded-none max-[425px]:h-screen max-[425px]:m-0 rounded-lg shadow-lg p-6 max-w-[600px] w-full`}
          >
            <div className="flex mb-5 border-b border-b-gray-300 justify-between">
              <h3 className="text-[20px] font-semibold text-yellow-700">
                Edit Profile
              </h3>
              <span
                onClick={() => setEdit(false)}
                className={`${
                  theme == "light" ? "" : "text-gray-300"
                } text-[35px] cursor-pointer`}
              >
                &times;
              </span>
            </div>

            <form onSubmit={handleSubmit(handleEditSubmit)} className="">
              <div className="flex items-center gap-3 mt-5 border-b pb-5 border-b-gray-200 mb-5">
                <div className="w-full">
                  <p className="flex gap-3 items-center mb-5">
                    <i className="text-yellow-700 bi bi-person-bounding-box"></i>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      User
                    </span>
                  </p>
                  {/*input*/}
                  <input
                    type="text"
                    placeholder="Enter Location"
                    defaultValue={user.user.name}
                    {...register("user.name")}
                    className={`${
                      theme == "light"
                        ? "border-gray-300"
                        : "text-white border-gray-800 bg-[#131A28]"
                    } flex items-center gap-3 w-full h-[50px]  border  p-[0_0_0_20px] rounded-lg`}
                  />
                  {errors?.user?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.user.name.message}
                    </p>
                  )}
                </div>
                <div className={`${errors?.user?.name ? "mb-6" : ""} w-full`}>
                  <p className="flex gap-3 items-center mb-5">
                    <i className="text-yellow-700 bi bi-sliders"></i>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      Can rent book
                    </span>
                  </p>
                  <select
                    {...register("can_rent_books")}
                    defaultValue={user.can_rent_books ? "yes" : "no"}
                    className={`${
                      theme == "light"
                        ? "border-gray-300"
                        : "text-white border-gray-800 bg-[#131A28]"
                    } border w-full p-3 shadow-sm rounded`}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors?.can_rent_books && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.can_rent_books.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={`border-b pb-5 border-b-gray-200 mb-5`}>
                <p className="flex gap-3 items-center mb-5">
                  <i className="text-yellow-700 bi bi-server"></i>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } text-[14px] font-medium`}
                  >
                    Networks
                  </span>
                </p>
                <div className="">
                  <div className="">
                    <div
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border mb-2.5 h-[50px] w-full rounded-lg p-[0_0_0_20px] border-gray-200 flex items-center gap-2`}
                    >
                      <span className="">
                        <i className="text-yellow-700 bi bi-instagram"></i>
                      </span>
                      {/* input */}

                      <input
                        {...register("library.social_media.instagram")}
                        type="text"
                        placeholder="Instagram"
                        className="max-w-full w-full outline-none"
                        defaultValue={user.social_media.instagram}
                      />
                    </div>
                    {errors?.library?.social_media?.instagram && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.library.social_media.instagram.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <div
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border mb-2.5 h-[50px] w-full rounded-lg p-[0_0_0_20px] border-gray-200 flex items-center gap-2`}
                    >
                      <span className="">
                        <i className="text-yellow-700 bi bi-facebook"></i>
                      </span>
                      {/* input */}

                      <input
                        {...register("library.social_media.facebook")}
                        type="text"
                        placeholder="Facebook"
                        className="max-w-full w-full outline-none"
                        defaultValue={user.social_media.facebook}
                      />
                    </div>
                    {errors?.library?.social_media?.facebook && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.library.social_media.facebook.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <div
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border mb-2.5 h-[50px] w-full rounded-lg p-[0_0_0_20px] border-gray-200 flex items-center gap-2`}
                    >
                      <span className="">
                        <i className="text-yellow-700 bi bi-telegram"></i>
                      </span>
                      {/* input */}
                      <input
                        {...register("library.social_media.telegram")}
                        type="text"
                        placeholder="Telegram"
                        className="max-w-full w-full outline-none"
                        defaultValue={user.social_media.telegram}
                      />
                    </div>
                    {errors?.library?.social_media?.telegram && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.library.social_media.telegram.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <div className={`border-b pb-5 border-b-gray-200 mb-5`}>
                  <p className="flex gap-3 items-center mb-5">
                    <i className="text-yellow-700 bi bi-map"></i>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      Address
                    </span>
                  </p>
                  <div
                    className={`${
                      theme == "light"
                        ? "border-gray-300"
                        : "text-white border-gray-800 bg-[#131A28]"
                    } flex items-center gap-3  min-h-[100px] max-h-[100px] border p-[0_0_0_20px] rounded-lg`}
                  >
                    <span className="">
                      <i className="text-yellow-700 bi bi-geo-alt"></i>
                    </span>
                    <textarea
                      {...register("address")}
                      type="text"
                      placeholder="Enter Location"
                      value={address ? address : user?.address}
                      className="w-full p-[20px_0] min-h-[100px] max-h-[100px] border-none outline-none border"
                    />
                  </div>
                  {errors?.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <button
                    onClick={() => setChooseLocation(true)}
                    type="button"
                    className="bg-yellow-700 rounded-xl text-[18px] text-white p-[10px_20px]"
                  >
                    choose Location on map
                  </button>

                  {chooseLocation && (
                    <div className="fixed bg-[#0004] p-[0_20px] flex justify-center top-0 left-0 items-center z-1100 w-full h-screen">
                      <div className="bg-white w-[800px] shadow-2xl rounded-lg p-[25px]">
                        <div className="">
                          <span className="">Edit Location</span>
                        </div>
                        <div className="w-full h-[300px]">
                          <YMaps
                            query={{
                              apikey: import.meta.env.VITE_YANDEX_API_KEY,
                            }}
                          >
                            <Map
                              className="w-full h-full"
                              defaultState={{
                                center: [user?.latitude, user?.longitude],
                                zoom: 15,
                              }}
                              onClick={handleClick}
                            >
                              {!coords && (
                                <Placemark
                                  defaultGeometry={[
                                    user?.latitude,
                                    user?.longitude,
                                  ]}
                                />
                              )}

                              {coords && (
                                <Placemark geometry={[coords[0], coords[1]]} />
                              )}

                              <FullscreenControl />
                              <GeolocationControl options={{ float: "left" }} />
                              <ZoomControl options={{ float: "right" }} />
                            </Map>
                          </YMaps>
                        </div>
                        <div className="flex gap-2 justify-end mt-3">
                          <button
                            className="p-[8px_16px] max-w-[100px] w-full bg-gray-400 text-white rounded-lg "
                            onClick={() => {
                              setCoords([user.latitude, user.longitude]);
                              setAddress(user?.address);
                              setChooseLocation(false);
                            }}
                          >
                            close
                          </button>
                          <button
                            className="p-[8px_16px] max-w-[150px] w-full bg-yellow-700 text-white rounded-lg "
                            onClick={() => {
                              setChooseLocation(false);
                              setValue("address", address);
                              setValue("latitude", coords[0].toFixed(6));
                              setValue("longitude", coords[1].toFixed(6));
                            }}
                          >
                            save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center gap-2 mt-5">
                <button
                  onClick={() => setEdit(false)}
                  type="button"
                  className={`${
                    theme == "light"
                      ? "border-gray-300 text-gray-800"
                      : "text-gray-300"
                  } p-[8px_0] max-w-[130px] border cursor-pointer rounded-lg  w-full text-[16px]`}
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="p-[8px_0] max-w-[100px] w-full text-[16px] cursor-pointer border border-yellow-700 bg-yellow-700 rounded-lg text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="container">
        <div className="">
          <div
            className={`${
              theme == "light" ? "bg-white" : "border border-gray-800"
            }  flex relative max-[700px]:block items-center mb-[30px] gap-[30px]  p-5 rounded-lg shadow-2xl`}
          >
            <div
              className={`${
                theme == "light"
                  ? "bg-[#CCCCCCFF] "
                  : "bg-[#030712FF] border border-gray-800"
              } max-[700px]:w-full rounded-lg  flex justify-center items-center w-[250px] h-[250px]`}
            >
              <i className="text-[100px] text-white bi bi-person-circle"></i>
            </div>

            <div className="">
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-person"></i>
                <h2
                  className={`${
                    theme == "light" ? "" : "text-gray-100"
                  } text-[30px] font-semibold`}
                >
                  {user?.user?.name}
                </h2>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-telephone"></i>
                <a
                  className={`${
                    theme == "light" ? "" : "text-gray-100"
                  }  underline text-[18px]`}
                  href={`tel:${user?.user?.phone}`}
                >
                  {user?.user?.phone}
                </a>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-bookmarks"></i>

                <span
                  className={`${
                    user?.can_rent_books ? "bg-green-600" : "bg-red-600"
                  } text-white text-[16px] rounded-lg p-[5px_20px]`}
                >
                  {user?.can_rent_books ? "can rent" : "cannot rent"}
                </span>
              </div>

              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-house-door"></i>
                <p
                  className={` ${
                    theme == "light" ? "" : "text-gray-100"
                  }   text-[18px] font-medium`}
                >
                  {user?.address}
                </p>
              </div>
            </div>
            <div
              onClick={() => (open ? setOpen(false) : setOpen(true))}
              className="group cursor-pointer transition-all duration-300"
            >
              <div
                className="absolute max-[700px]:top-8 max-[700px]:right-8 top-[25px] right-[25px] h-10 w-[50px] 
                flex justify-center items-center 
                border border-yellow-700 rounded-lg 
                cursor-pointer transition-all duration-300 hover:text-white group-hover:bg-yellow-700"
              >
                <i className="bi bi-gear text-[20px] text-yellow-700 group-hover:text-white"></i>
              </div>

              {open && (
                <div className="w-[200px] h-[140px] items-center top-17 right-0 absolute">
                  <div
                    className={`${
                      theme == "light" ? "bg-white" : "bg-[#030712FF]"
                    }  shadow-2xl 
                  p-2.5 rounded-lg max-w-[200px] w-full `}
                  >
                    <button
                      onClick={() => setEdit(true)}
                      className="cursor-pointer w-full flex mb-3 text-yellow-700 text-[18px] font-semibold items-center gap-3"
                    >
                      <i className="bi bi-pencil-square"></i>
                      <span className="">{t("edit")}</span>
                    </button>

                    <button
                      onClick={() => navigate("/switch")}
                      className="cursor-pointer w-full flex mb-3 text-yellow-700 text-[18px] font-semibold items-center gap-3"
                    >
                      <i className="text-[20px] bi bi-toggle-off"></i>
                      <span className="">{t("switch")}</span>
                    </button>

                    <button
                      onClick={() => setLogOurModal(true)}
                      className="cursor-pointer w-full flex text-red-500 text-[18px] font-semibold items-center gap-3"
                    >
                      <i className="bi bi-box-arrow-left"></i>
                      <span className="">{t("logout")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "border-gray-800 shadow-none border"
            }  max-[600px]:p-3 shadow-2xl p-[25px] rounded-lg`}
          >
            <div>
              <div
                className={`${
                  theme == "light" ? "border-b-gray-100" : "border-gray-800"
                } w-full max-[678px]:overflow-x-auto flex flex-nowrap border-b pb-5`}
              >
                <button
                  className={`pb-2 ${
                    activeTab === "books" ? "border-b-2 border-yellow-700" : ""
                  } ${
                    theme == "light" ? "" : "text-white"
                  }  flex gap-5 p-[10px_0] max-w-[200px] min-w-[150px] justify-center w-full whitespace-nowrap`}
                  onClick={() => setActiveTab("books")}
                >
                  <i className="text-yellow-700 bi bi-journal-bookmark"></i>
                  <span className="">{t("profile.Books")}</span>
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "network"
                      ? "border-b-2 border-yellow-700"
                      : ""
                  }  ${
                    theme == "light" ? "" : "text-white"
                  }  flex gap-5 p-[10px_0] max-w-[200px] min-w-[150px] justify-center w-full whitespace-nowrap`}
                  onClick={() => setActiveTab("network")}
                >
                  <i className="text-yellow-700 bi bi-share"></i>
                  <span className="">{t("profile.newWorks")}</span>
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "map" ? "border-b-2 border-yellow-700" : ""
                  }  ${
                    theme == "light" ? "" : "text-white"
                  } flex gap-5 p-[10px_0] max-w-[200px] min-w-[150px] justify-center w-full whitespace-nowrap`}
                  onClick={() => setActiveTab("map")}
                >
                  <i className="text-yellow-700 bi bi-geo-alt"></i>
                  <span className="">{t("profile.location")}</span>
                </button>
              </div>

              <div className="mt-4">
                {activeTab === "books" && (
                  <div>
                    <h2
                      className={`${
                        theme == "light"
                          ? "border-b-gray-300"
                          : "border-b-gray-800 text-white"
                      } pb-5 border-b text-[30px] font-semibold my-5`}
                    >
                      {t("profile.Books")}
                    </h2>
                    <ul className="grid grid-cols-4 gap-6 max-[1140px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
                      {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => (
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
                        : pagination.map((book, index) => (
                            <div key={book.id} className="">
                              <PublicBooksItem
                                index={index}
                                book={book}
                                library
                                {...book}
                              />
                            </div>
                          ))}
                    </ul>

                    <div className="mt-10 flex gap-10 items-center justify-center  flex-wrap">
                      <div className="">
                        <select
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPageNum(0);
                          }}
                          className={`${
                            theme == "light" ? "" : "text-gray-300"
                          }`}
                        >
                          <option value="8">8</option>
                          <option value="16">16</option>
                          <option value="24">24</option>
                          <option value="32">32</option>
                        </select>
                      </div>
                      <div className="flex gap-5 items-center justify-center flex-wrap">
                        <button
                          disabled={pageNum === 0}
                          onClick={() => setPageNum((p) => p - 1)}
                          className={`${
                            theme == "light" ? "text-gray-800" : "text-gray-300"
                          } cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed  text-[18px] font-semibold`}
                        >
                          prev
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            onClick={() => setPageNum(index)}
                            className={`p-2 cursor-pointer w-[35px] rounded-lg border-gray-300 font-medium ${
                              pageNum === index
                                ? "bg-yellow-700 border-yellow-700 text-white"
                                : ""
                            } ${theme == "light" ? "" : "text-white "} border`}
                            key={index}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          disabled={pageNum === totalPages - 1}
                          onClick={() => setPageNum((p) => p + 1)}
                          className={`${
                            theme == "light" ? "text-gray-800" : "text-gray-300"
                          } cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed  text-[18px] font-semibold`}
                        >
                          next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "network" && (
                  <div>
                    <div className="">
                      <h2
                        className={`${
                          theme == "light"
                            ? "border-b-gray-300"
                            : "border-b-gray-800 text-white"
                        } pb-5 border-b text-[30px] font-semibold my-5`}
                      >
                        {t("profile.newWorks")}
                      </h2>
                      <div className="grid grid-cols-3 max-[425px]:grid-cols-2">
                        <button
                          onClick={() =>
                            navigate(`https://${user?.social_media?.instagram}`)
                          }
                          className={`${
                            theme == "light" ? "" : "text-gray-300"
                          } flex gap-2 p-[10px_20px]`}
                        >
                          <i className="text-yellow-700 bi bi-instagram"></i>
                          <span>instagram</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`https://${user?.social_media?.facebook}`)
                          }
                          className={`${
                            theme == "light" ? "" : "text-gray-300"
                          } flex gap-2 p-[10px_20px]`}
                        >
                          <i className="text-yellow-700 bi bi-facebook"></i>
                          <span>facebook</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`https://${user?.social_media?.telegram}`)
                          }
                          className={`${
                            theme == "light" ? "" : "text-gray-300"
                          } flex gap-2 p-[10px_20px]`}
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
                    <h2
                      className={`${
                        theme == "light"
                          ? "border-b-gray-300"
                          : "border-b-gray-800 text-white"
                      } pb-5 border-b text-[30px] font-semibold my-5`}
                    >
                      {t("profile.location")}
                    </h2>

                    <div className="">
                      <div className="flex gap-5 items-center p-2.5 mb-10">
                        <i className={` text-yellow-700 bi bi-geo-alt`}></i>
                        <span
                          className={`${
                            theme == "light" ? "" : "text-gray-300"
                          }`}
                        >
                          {user?.address}
                        </span>
                      </div>

                      <div className="w-full h-100">
                        {!user ? (
                          <div className="w-full h-100 bg-gray-200"></div>
                        ) : (
                          <YMaps
                            query={{
                              apikey: import.meta.env.VITE_YANDEX_API_KEY,
                            }}
                          >
                            <Map
                              className="w-full h-full"
                              state={{
                                center: [user.latitude, user.longitude],
                                zoom: 15,
                              }}
                            >
                              <Placemark
                                geometry={[user.latitude, user.longitude]}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
