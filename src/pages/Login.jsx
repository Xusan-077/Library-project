import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useThemeStore from "../store/useThemeStore";
import useAuthStore from "../store/useUserAuth";

import Logo from "../assets/icons/Logo.png";
import API from "../../API/API";
import { useEffect } from "react";

import bg from "../assets/images/bg.png";

export default function Login() {
  const { theme } = useThemeStore();

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const schema = yup.object({
    phone: yup.string().min(6, "Phone number is required.").required(),
    password: yup.string().min(6).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (body) => {
      const res = await API.post("/auth/login/", body);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Success login to system", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
      login(data);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message || "Error in login", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
    },
  });

  const onSubmit = (data) => {
    localStorage.clear();

    mutation.mutate(data);
  };

  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <section
      style={{
        backgroundImage: theme === "light" ? "none" : `url(${bg})`,
      }}
      className={`${
        theme == "light" ? "" : ""
      } relative h-screen w-full bg-cover bg-center bg-no-repeat`}
    >
      {theme !== "light" && (
        <div className="absolute inset-0 bg-black/80"></div>
      )}

      <div className="relative z-10 max-[900px]:block flex items-center justify-center h-full">
        <div
          className={`
        ${
          theme === "light"
            ? "bg-white"
            : "bg-white/10 backdrop-blur-xl border border-white/20"
        }
        max-[900px]:w-full max-[900px]:max-w-full max-[900px]:h-screen max-[900px]:rounded-none max-[900px]:p-[30px_20px]
        max-w-[700px] w-full p-[70px_50px]
        rounded-2xl shadow-2xl
      `}
        >
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer p-2.5 text-white rounded-lg w-[120px] bg-yellow-700"
          >
            Back
          </button>

          <div className="w-full mt-20">
            <div className="flex flex-col items-center gap-4">
              <Link className="flex items-center gap-2" to="/">
                <img src={Logo} alt="" className="w-[50px] h-[50px]" />
                <span className="text-[35px] font-bold text-yellow-700">
                  LibraSpace
                </span>
              </Link>

              <h2
                className={`
              ${theme === "light" ? "text-gray-700" : "text-white"}
              text-[18px] mb-[50px] text-center
            `}
              >
                Login into your account
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              {/* PHONE */}
              <label className="mb-[30px]">
                <span
                  className={`
                ${theme === "light" ? "text-gray-700" : "text-white"}
                mb-2.5 block
              `}
                >
                  Phone number
                </span>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className={`
                ${
                  theme === "light"
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                }
                border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full
              `}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </label>

              {/* PASSWORD */}
              <label>
                <span
                  className={`
                ${theme === "light" ? "text-gray-700" : "text-white"}
                mb-2.5 block
              `}
                >
                  Password
                </span>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className={`
                ${
                  theme === "light"
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                }
                border p-[0_20px] mt-1 h-15 rounded-lg outline-none w-full
              `}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </label>

              <button
                type="submit"
                className="w-full cursor-pointer p-[15px_0] bg-yellow-700 hover:bg-yellow-800 transition text-white rounded-lg text-[16px] mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
