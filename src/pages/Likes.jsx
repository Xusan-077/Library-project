import PublicBooksItem from "../components/PublicBooksItem";
import useLikeStore from "../store/useLikeStore";

export default function Likes() {
  const { likes } = useLikeStore();

  return (
    <section className="">
      <div className="container">
        <div className="m-[50px_0]">
          <h2 className="text-[35px] font-bold mb-5">My Favarite Books</h2>

          {likes.length == 0 && (
            <div className="text-center py-10">
              <i className="bi bi-book text-gray-400 text-[100px] mb-4"></i>
              <p className="text-[30px] font-semibold text-red-500">
                Your Favarite Books Not Yet
              </p>
            </div>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {likes.map((book, index) => (
              <PublicBooksItem
                index={index}
                book={book}
                library
                key={book.id}
                {...book}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
