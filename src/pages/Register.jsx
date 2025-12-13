import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeStore from "../store/useThemeStore";

import API from "../../API/API";

import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { theme } = useThemeStore();

  const [coords, setCoords] = useState(null);
  const [adress, setAdress] = useState("");

  const navigate = useNavigate();

  const refForm = useRef();

  const schema = yup.object({
    user: yup.object({
      name: yup.string().required("Name is required"),
      phone: yup.string().required("Phone is required"),
      password: yup.string().required("Password is required"),
    }),
    library: yup.object({
      social_media: yup.object({
        instagram: yup.string().required("Instagram is required"),
        facebook: yup.string().required("Facebook is required"),
        telegram: yup.string().required("Telegram is required"),
      }),
      address: yup.string().required("Address is required"),
      can_rent_books: yup.string().required(),
      latitude: yup.string().required(),
      longitude: yup.string().required(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: handleRegisterToLibrary } = useMutation({
    mutationFn: async (body) => {
      const res = API.post(`/auth/register-library/`, body);

      return res?.data;
    },
    onSuccess: () => {
      toast.success(
        "success register to ibrary it will acceptance in 24 hours"
      );

      refForm.current.reset();

      navigate("/", {
        replace: true,
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed t register library");
    },
  });

  function handleRegister(data) {
    handleRegisterToLibrary(data);
  }

  async function handleClick(e) {
    const c = e.get("coords");
    setCoords(c);

    setValue("library.latitude", c[0].toFixed(6));
    setValue("library.longitude", c[1].toFixed(6));

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=bc32072f-a50d-4f7e-b22c-a4b70bba1202&geocode=${c[1]},${c[0]}&format=json&results=1&kind=house&lang=en_US`
      );

      const data = await response.json();

      const address =
        data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.text;

      setAdress(address);
      setValue("library.address", address);

      return address ?? `${c[0].toFixed(6)}, ${c[1].toFixed(6)}`;
    } catch (error) {
      toast.warn("Failed to catch location:", error.message);

      const fallback = `${c[0].toFixed(6)}, ${c[1].toFixed(6)}`;
      setValue("library.address", fallback);
      return fallback;
    }
  }

  return (
    <section
      className={`${
        theme === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-700 text-white"
      }
     min-h-screen flex justify-center items-start py-12 max-[600px]:p-0`}
    >
      <div className="w-full flex justify-center px-4 max-[425px]:p-0">
        <div
          className={`${theme === "light" ? "bg-white" : "bg-gray-800"}
         rounded-2xl shadow-2xl p-[50px_60px_90px_60px]
         max-w-[1240px] w-full max-[630px]:p-[30px] max-[425px]:rounded-none`}
        >
          <div className="mb-10">
            <h2 className="text-[32px] font-bold mb-2 text-center max-[425px]:text-[24px]">
              Librarian Registration
            </h2>
            <p className="text-[18px] font-semibold text-center">
              Fill in the library information
            </p>
          </div>

          <form ref={refForm} onSubmit={handleSubmit(handleRegister)}>
            <div className="grid grid-cols-2 gap-10 mb-10 items-center max-[570px]:grid-cols-1">
              {/* user */}

              <div className="flex flex-col gap-3">
                {/* NAME */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Name
                  </span>

                  <input
                    type="text"
                    {...register("user.name")}
                    placeholder="Enter your name"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />
                  {errors?.user?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.user.name.message}
                    </p>
                  )}
                </label>

                {/* PHONE */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Phone
                  </span>

                  <input
                    type="number"
                    {...register("user.phone")}
                    placeholder="+998 123 45 67"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />
                  {errors?.user?.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.user.phone.message}
                    </p>
                  )}
                </label>

                {/* PASSWORD */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Password
                  </span>

                  <input
                    type="password"
                    {...register("user.password")}
                    placeholder="******"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />
                  {errors?.user?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.user.password.message}
                    </p>
                  )}
                </label>
              </div>

              {/* social media */}
              <div className="flex flex-col gap-3">
                {/* INSTAGRAM */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Instagram
                  </span>

                  <input
                    type="text"
                    {...register("library.social_media.instagram")}
                    placeholder="Enter your instagram"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />

                  {errors?.library?.social_media?.instagram && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.social_media.instagram.message}
                    </p>
                  )}
                </label>

                {/* FACEBOOK */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Facebook
                  </span>

                  <input
                    type="text"
                    {...register("library.social_media.facebook")}
                    placeholder="Enter your facebook"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />

                  {errors?.library?.social_media?.facebook && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.social_media.facebook.message}
                    </p>
                  )}
                </label>

                {/* TELEGRAM */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Telegram
                  </span>

                  <input
                    type="text"
                    {...register("library.social_media.telegram")}
                    placeholder="Enter your telegram"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />

                  {errors?.library?.social_media?.telegram && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.social_media.telegram.message}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* address */}
            <div className="flex gap-10 max-[960px]:flex flex-col-reverse">
              <div className="w-full h-[430px]">
                <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API_KEY }}>
                  <Map
                    className="w-full h-full"
                    defaultState={{ center: [41.3, 69.2], zoom: 11 }}
                    onClick={handleClick}
                  >
                    {coords && <Placemark geometry={[coords[0], coords[1]]} />}

                    <FullscreenControl />
                    <GeolocationControl options={{ float: "left" }} />
                    <ZoomControl options={{ float: "right" }} />
                  </Map>
                </YMaps>
              </div>

              <div className="w-full flex flex-col gap-3">
                {/* can rent book */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    can rent book
                  </span>

                  <select
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                    {...register("library.can_rent_books")}
                  >
                    <option selected value="yes">
                      Yes
                    </option>
                    <option value="no">No</option>
                  </select>

                  {errors?.library?.can_rent_books && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.can_rent_books.message}
                    </p>
                  )}
                </label>

                {/* ADDRESS */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Address
                  </span>

                  <input
                    type="text"
                    {...register("library.address")}
                    disabled
                    placeholder="Enter your address"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />

                  {errors?.library?.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.address.message}
                    </p>
                  )}
                </label>

                {/* latitude */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Latitude
                  </span>

                  <input
                    type="text"
                    {...register("library.latitude")}
                    disabled
                    placeholder="Enter your latitude"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />

                  {errors?.library?.latitude && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.latitude.message}
                    </p>
                  )}
                </label>

                {/* longitude */}
                <label>
                  <span
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-white"
                    } mb-2.5 block`}
                  >
                    Longitude
                  </span>

                  <input
                    type="text"
                    {...register("library.longitude")}
                    disabled
                    placeholder="Enter your longitude"
                    className={`${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                    } border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full`}
                  />

                  {errors?.library?.longitude && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.library.longitude.message}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {
              <button
                onClick={() =>
                  navigate("/", {
                    replace: true,
                  })
                }
                type="button"
                className="fixed z-100 cursor-pointer bottom-4 right-4 bg-yellow-700 text-white rounded-lg max-w-[140px] w-full text-[18px] p-[10px_0]"
              >
                Back
              </button>
            }

            <div className="flex items-center gap-2 mt-4 justify-end">
              <button
                className="p-2.5 bg-yellow-700 cursor-pointer text-white rounded-lg text-[18px] max-w-[200px] w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
