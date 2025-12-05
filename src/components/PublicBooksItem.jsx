import { useNavigate } from "react-router-dom";
import publicImg from "../assets/images/book-img.avif";
import publicImg2 from "../assets/images/book-img3.webp";
import useLikeStore from "../store/useLikeStore";

export default function PublicBooksItem({
  name,
  publisher,
  author,
  quantity_in_library,
  library,
  book,
  index,
}) {
  const { likesBooks, toggleLike } = useLikeStore();

  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/book/${book.id}`)}
      className={`${
        library ? "min-w-[280px]" : ""
      } cursor-pointer shadow-lg rounded-lg p-4 hover:translate-y-[-5px] hover:shadow-xl transition-all duration-500`}
    >
      <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100">
        <div className="w-full h-[220px] bg-gray-200">
          {index % 2 == 0 ? (
            <img
              src={publicImg || "/placeholder-book.jpg"}
              alt={name}
              className="w-full h-[220px]  object-cover transition-transform duration-300"
            />
          ) : (
            <img
              src={publicImg2 || "/placeholder-book.jpg"}
              alt={name}
              className="w-full h-[220px]  object-cover transition-transform duration-300"
            />
          )}
        </div>

        <div className="absolute flex items-center justify-between w-full p-[0_15px] top-2 right-0">
          {quantity_in_library > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded">
              quantity: {quantity_in_library}
            </span>
          )}

          <div className="cursor-pointer">
            <button
              className="text-[20px] text-white left-2.5"
              onClick={(e) => {
                e.stopPropagation();

                toggleLike(book);
              }}
            >
              {likesBooks.find((el) => el.id == book.id) ? (
                <i className="text-red-500 bi bi-heart-fill"></i>
              ) : (
                <i className="bi bi-heart"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 border-b border-b-gray-200 pb-2.5 transition-colors">
          {name}
        </h3>
        <div className="pt-2">
          <p className="text-xs text-gray-600 dark:text-gray-400">{author}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {publisher}
          </p>
        </div>
      </div>
    </li>
  );
}
