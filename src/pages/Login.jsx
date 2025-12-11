import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useThemeStore from "../store/useThemeStore";
import useAuthStore from "../store/useUserAuth";

import API from "../../API/API";

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

  return (
    <section
      className={`${
        theme == "light" ? "" : "bg-gray-800"
      } h-screen w-full relative`}
    >
      <div onClick={() => navigate(-1)} className="">
        <button className="fixed z-100 cursor-pointer bottom-4 right-4 bg-yellow-700 text-white rounded-lg max-w-[140px] w-full text-[18px] p-[10px_0]">
          Back
        </button>
      </div>

      <div className="relative z-10 max-[900px]:block flex items-center justify-center h-full">
        <div
          className={`
        ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}
        max-[900px]:w-full max-[900px]:max-w-full max-[900px]:h-screen max-[900px]:rounded-none max-[900px]:p-[90px_57px]
        max-w-[630px] w-full p-[70px_50px]
        rounded-2xl shadow-2xl
      `}
        >
          <div className="w-full">
            <div className="mb-[30px]">
              <h2
                className={`${
                  theme == "light" ? "" : ""
                } text-[32px] text-center font-bold`}
              >
                Login to Account
              </h2>
              <p className={` text-center text-[18px] font-semibold`}>
                Please enter your phone and password to continue
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label className="mb-10">
                <span
                  className={`
                ${theme === "light" ? "text-[#202224]" : "text-white"}
                mb-2.5 block text-[18px] font-semibold
              `}
                >
                  Phone:
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
              <label className="mb-3">
                <span
                  className={`
                ${theme === "light" ? "text-[#202224]" : "text-white"}
                mb-2.5 block text-[18px] font-semibold
                 `}
                >
                  Password:
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

              <Link
                to="/register"
                className={`${
                  theme == "light" ? "text-black" : "text-white"
                } text-center  text-[18x] mt-3`}
              >
                Don’t have an account?
                <span className="text-yellow-600 underline">
                  Create Account
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
