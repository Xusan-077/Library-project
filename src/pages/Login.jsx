import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "../store/useUserAuth";

import loginImage from "../assets/images/login-img.png";
import Logo from "../assets/icons/Logo.png";
import API from "../../API/API";

export default function Login() {
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

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (body) => {
      const res = await API.post("/auth/login/", body);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Success login to system");
      login(data);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message || "Error in login");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="bg-[#F1F3F6FF] h-screen">
      <div className="w-full h-full flex items-center justify-between">
        <div className="bg-white max-[900px]:w-full max-[900px]:p-[0_20px] w-[40%] relative h-full flex flex-col p-[20px_40px]">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer p-2.5 text-white rounded-lg w-[120px] bg-yellow-700 absolute top-5 left-5"
          >
            Back to main
          </button>

          <div className="w-full mt-20 max-[900px]:mt-30">
            <div className="flex flex-col items-center gap-4">
              <Link className="flex items-center gap-2" to="/">
                <img src={Logo} alt="" className="w-[50px] h-[50px]" />
                <span className="text-[35px] font-bold text-yellow-700">
                  LibraSpace
                </span>
              </Link>

              <h2 className="text-[18px] mb-[50px] text-center">
                Login into your account
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label className="mb-[30px]">
                <span className="text-[16px] text-[#555] mb-2.5 block">
                  Phone number
                </span>

                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="text-[14px] text-[#555] outline-none h-[50px] p-[0_0_0_20px] bg-[#F1F3F6FF] w-full rounded-lg"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </label>

              <label>
                <span className="text-[16px] text-[#555] mb-2.5 block">
                  Password
                </span>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="text-[14px] text-[#555] outline-none h-[50px] p-[0_0_0_20px] bg-[#F1F3F6FF] w-full rounded-lg"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </label>

              <button
                type="submit"
                className="w-full cursor-pointer p-[15px_0] bg-yellow-700 text-white rounded-lg text-[16px] mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="w-[60%] max-[900px]:hidden h-full flex justify-center items-center">
          <img src={loginImage} alt="" className="w-[700px] h-[700px]" />
        </div>
      </div>
    </section>
  );
}
