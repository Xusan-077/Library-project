import useThemeStore from "../store/useThemeStore";

function ExeItem({
  book,
  setExeEditBook,
  setExeDataDelete,
  setExeOneBook,
  setDeleteBook,
  setEditExeBook,
  index,
  setExeEditIndex,
}) {
  const { theme } = useThemeStore();

  return (
    <>
      <li className="grid grid-cols-[1fr_1fr_1fr_100px_100px] items-center border-b border-b-gray-300">
        <span
          className={`${
            theme == "light" ? "text-gray-700" : "text-gray-300"
          } p-4 text-[16px] font-medium`}
        >
          {book?.name}
        </span>
        <span
          className={`${
            theme == "light" ? "text-gray-700" : "text-gray-300"
          } p-4 text-[16px] font-medium`}
        >
          {book?.author}
        </span>
        <span
          className={`${
            theme == "light" ? "text-gray-700" : "text-gray-300"
          } p-4 text-[16px] font-medium`}
        >
          {book?.publisher}
        </span>
        <span
          className={`${
            theme == "light" ? "text-gray-700" : "text-gray-300"
          } p-4 text-[16px] font-medium`}
        >
          {book?.quantity_in_library}
        </span>
        <div className="flex p-4 items-center justify-between">
          <button
            onClick={() => {
              setEditExeBook(true);
              setExeEditBook(book);
              setExeOneBook(book);
              if (typeof setExeEditIndex === "function") setExeEditIndex(index);
            }}
            className="cursor-pointer"
          >
            <i className="text-[22px] text-yellow-700 bi bi-pencil-square"></i>
          </button>
          <button
            onClick={() => {
              setExeDataDelete(true);
              setDeleteBook(book);
            }}
            className="cursor-pointer"
          >
            <i className="text-[22px] text-red-500 bi bi-trash3"></i>
          </button>
        </div>
      </li>
    </>
  );
}

export default ExeItem;
