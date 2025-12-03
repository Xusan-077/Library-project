import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login-img.png";
import Logo from "../assets/icons/Logo.png";

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F1F3F6FF] h-screen">
      <div className="w-full h-full flex items-center justify-between">
        <div className="bg-white w-[40%] relative h-full flex items-start justify-center flex-col p-[20px_40px]">
          <div className="flex justify-end absolute top-5 left-5">
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer p-2.5 text-white rounded-lg w-[120px] bg-yellow-700"
            >
              Orqaga
            </button>
          </div>

          <div className=" w-full ">
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
            <form className="flex flex-col">
              <label className="mb-[30px]">
                <span className="text-[16px] text-[#555] mb-2.5 block">
                  tel number
                </span>

                <input
                  type="text"
                  placeholder="Enter your tel"
                  className="text-[14px] text-[#555555] outline-none h-[50px] p-[0_0_0_20px] bg-[#F1F3F6FF] w-full rounded-lg"
                />
              </label>
              <label>
                <span className="text-[16px] text-[#555] mb-2.5 block">
                  Password
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="text-[14px] text-[#555555] outline-none h-[50px] p-[0_0_0_20px] bg-[#F1F3F6FF] w-full rounded-lg"
                />
              </label>

              <button className="w-full cursor-pointer p-[15px_0] bg-yellow-700  text-white rounded-lg text-[16px] mt-4">
                Tizimga kirish
              </button>
            </form>
          </div>
        </div>
        <div className="w-[60%] h-full flex justify-center items-center">
          <img src={loginImage} alt="" className="w-[700px] h-[700px]" />
        </div>
      </div>
    </section>
  );
}
