import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F1F3F6] text-center px-4">
      <h1 className="text-[120px] font-extrabold text-yellow-700 leading-none">
        404
      </h1>

      <h2 className="text-[28px] font-semibold text-gray-900 mt-4">
        Sahifa topilmadi
      </h2>

      <p className="text-gray-600 mt-2 max-w-[450px]">
        Siz qidirayotgan sahifa mavjud emas yoki o‘chirib yuborilgan. Iltimos,
        bosh sahifaga qayting yoki menyudan foydalaning.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-8 py-3 bg-yellow-700 text-white rounded-lg text-[18px] font-medium hover:bg-yellow-800 transition"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
