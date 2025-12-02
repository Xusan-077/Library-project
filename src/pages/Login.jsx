import { Link } from "react-router-dom";
import loginImage from "../assets/images/login-image.svg";

export default function Login() {
  return (
    <section>
      <div className="">
        <div className="">
          <img src={loginImage} alt="" className="" />
        </div>
        <div className="">
          <Link to="/">Orqaga</Link>

          <div className="">
            <h2 className="">Tizimga kirish</h2>
            <p className="">
              Platformadan to`liq foydalanish uchun tizimga kiring
            </p>
            <form className="">
              <label>
                <span className="">Telefon raqam</span>

                <input type="text" placeholder="telefon raqam" className="" />
              </label>
              <label>
                <span className="">Parol</span>

                <input type="password" placeholder="parol" className="" />
              </label>

              <button className="">Tizimga kirish</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
